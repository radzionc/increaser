import { Project } from '@increaser/entities/Project'
import { Set } from '@increaser/entities/User'
import { setToProjectWeek } from '@increaser/entities-utils/project/setToProjectWeek'
import { mergeIntoProjectWeeks } from '@increaser/entities-utils/project/mergeIntoProjectWeeks'
import { getSetsDurationInSeconds } from '@increaser/entities-utils/set/getSetsDurationInSeconds'
import { getUserById, updateUser } from '@increaser/db/user'
import { splitSetsByTimestamp } from '@increaser/entities-utils/set/splitSetsByTimestamp'
import { inTimeZone } from '@increaser/utils/time/inTimeZone'
import { getWeekStartedAt } from '@increaser/utils/time/getWeekStartedAt'
import { groupSetsByProject } from '@increaser/entities-utils/set/groupSetsByProject'

const projectsWeeksToStore = 4

const addNewSetsToProject = (project: Project, sets: Set[]) => {
  let newWeeks = [...project.weeks]
  sets.map(setToProjectWeek).forEach((week) => {
    newWeeks = mergeIntoProjectWeeks(newWeeks, week)
  })

  return {
    ...project,
    weeks: newWeeks.slice(-projectsWeeksToStore),
    total: project.total + getSetsDurationInSeconds(sets),
  }
}

export const organizeWeeks = async (userId: string) => {
  const { sets, timeZone, projects, prevSets } = await getUserById(userId, [
    'sets',
    'timeZone',
    'projects',
    'prevSets',
  ])

  const weekStartedAt = inTimeZone(getWeekStartedAt(Date.now()), timeZone)

  const { beforeTimestamp, afterTimestamp } = splitSetsByTimestamp(
    sets,
    weekStartedAt,
  )

  if (!beforeTimestamp.length) {
    return
  }

  const groupedSets = groupSetsByProject(beforeTimestamp)
  const newProjects = projects.map((project) => {
    const sets = groupedSets[project.id]

    if (!sets) {
      return project
    }

    return addNewSetsToProject(project, sets)
  })

  await updateUser(userId, {
    projects: newProjects,
    sets: afterTimestamp,
    prevSets: [...prevSets, ...beforeTimestamp],
  })
}
