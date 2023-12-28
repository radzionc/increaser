import { mergeIntoProjectMonths } from '@increaser/entities-utils/project/mergeIntoProjectMonths'
import { setToProjectMonth } from '@increaser/entities-utils/project/setToProjectMonth'
import { getSetsFinishedBefore } from '@increaser/entities-utils/set/getSetsFinishedBefore'
import { getSetsStartedAfter } from '@increaser/entities-utils/set/getSetsStartedAfter'
import { groupSetsByProject } from '@increaser/entities-utils/set/groupSetsByProject'
import { scoreboardPeriodInDays } from '@increaser/entities/PerformanceScoreboard'
import { Project } from '@increaser/entities/Project'
import { Set, User } from '@increaser/entities/User'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { getMonthStartedAt } from '@lib/utils/time/getMonthStartedAt'
import { inTimeZone } from '@lib/utils/time/inTimeZone'

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

type UserFields = Pick<
  User,
  'sets' | 'timeZone' | 'projects' | 'lastSyncedMonthEndedAt'
>

export const organizeMonths = ({
  timeZone,
  lastSyncedMonthEndedAt,
  sets,
  projects,
}: UserFields): Partial<UserFields> => {
  const monthStartedAt = inTimeZone(getMonthStartedAt(Date.now()), timeZone)

  if (lastSyncedMonthEndedAt && monthStartedAt <= lastSyncedMonthEndedAt) {
    return {}
  }

  const previousMonthsSets = getSetsFinishedBefore(sets, monthStartedAt)

  const unsyncedSets = lastSyncedMonthEndedAt
    ? getSetsStartedAfter(previousMonthsSets, lastSyncedMonthEndedAt)
    : previousMonthsSets

  if (!unsyncedSets.length) {
    return {}
  }

  const groupedSets = groupSetsByProject(unsyncedSets)
  const newProjects = projects.map((project) => {
    const sets = groupedSets[project.id]

    if (!sets) {
      return project
    }

    return addNewSetsToProject(project, sets)
  })

  const keepSetsStartedAfter =
    Date.now() -
    convertDuration(
      Math.max(...Object.values(scoreboardPeriodInDays), 31),
      'd',
      'ms',
    )

  return {
    projects: newProjects,
    sets: getSetsStartedAfter(sets, keepSetsStartedAfter),
    lastSyncedMonthEndedAt: monthStartedAt,
  }
}
