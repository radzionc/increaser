import { getUserById, updateUser } from '@increaser/db/user'
import { mergeIntoProjectMonths } from '@increaser/entities-utils/project/mergeIntoProjectMonths'
import { setToProjectMonth } from '@increaser/entities-utils/project/setToProjectMonth'
import { groupSetsByProject } from '@increaser/entities-utils/set/groupSetsByProject'
import { splitSetsByTimestamp } from '@increaser/entities-utils/set/splitSetsByTimestamp'
import { Project } from '@increaser/entities/Project'
import { Set } from '@increaser/entities/User'
import { getMonthStartedAt } from '@increaser/utils/time/getMonthStartedAt'
import { inTimeZone } from '@increaser/utils/time/inTimeZone'

const addNewSetsToProject = (project: Project, sets: Set[]) => {
  let netMonths = [...project.months]
  sets.map(setToProjectMonth).forEach((month) => {
    netMonths = mergeIntoProjectMonths(netMonths, month)
  })

  return {
    ...project,
    months: netMonths,
  }
}

export const organizeMonths = async (userId: string) => {
  const {
    sets: currentWeekSets,
    prevSets,
    timeZone,
    projects,
    lastSyncedMonthEndedAt,
  } = await getUserById(userId, [
    'sets',
    'prevSets',
    'timeZone',
    'projects',
    'lastSyncedMonthEndedAt',
  ])

  const sets = [...prevSets, ...currentWeekSets]

  const monthStartedAt = inTimeZone(getMonthStartedAt(Date.now()), timeZone)

  if (lastSyncedMonthEndedAt && monthStartedAt <= lastSyncedMonthEndedAt) {
    return
  }

  const { beforeTimestamp: previousMonthsSets } = splitSetsByTimestamp(
    sets,
    monthStartedAt,
  )

  const unsyncedSets = lastSyncedMonthEndedAt
    ? splitSetsByTimestamp(previousMonthsSets, lastSyncedMonthEndedAt)
        .afterTimestamp
    : previousMonthsSets

  if (!unsyncedSets.length) {
    return
  }

  const groupedSets = groupSetsByProject(unsyncedSets)
  const newProjects = projects.map((project) => {
    const sets = groupedSets[project.id]

    if (!sets) {
      return project
    }

    return addNewSetsToProject(project, sets)
  })

  await updateUser(userId, {
    projects: newProjects,
    prevSets: splitSetsByTimestamp(prevSets, monthStartedAt).afterTimestamp,
    lastSyncedMonthEndedAt: monthStartedAt,
  })
}
