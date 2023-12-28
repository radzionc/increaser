import { Project } from '@increaser/entities/Project'
import { Set, User } from '@increaser/entities/User'
import { setToProjectWeek } from '@increaser/entities-utils/project/setToProjectWeek'
import { mergeIntoProjectWeeks } from '@increaser/entities-utils/project/mergeIntoProjectWeeks'
import { getSetsDurationInSeconds } from '@increaser/entities-utils/set/getSetsDurationInSeconds'
import { inTimeZone } from '@lib/utils/time/inTimeZone'
import { getWeekStartedAt } from '@lib/utils/time/getWeekStartedAt'
import { groupSetsByProject } from '@increaser/entities-utils/set/groupSetsByProject'
import { getSetsFinishedBefore } from '@increaser/entities-utils/set/getSetsFinishedBefore'
import { getSetsStartedAfter } from '@increaser/entities-utils/set/getSetsStartedAfter'

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

type UserFields = Pick<
  User,
  'sets' | 'timeZone' | 'projects' | 'lastSyncedWeekEndedAt'
>

export const organizeWeeks = ({
  timeZone,
  lastSyncedWeekEndedAt,
  sets,
  projects,
}: UserFields): Partial<UserFields> => {
  const weekStartedAt = inTimeZone(getWeekStartedAt(Date.now()), timeZone)

  if (lastSyncedWeekEndedAt && weekStartedAt <= lastSyncedWeekEndedAt) {
    return {}
  }

  const previousWeekSets = getSetsFinishedBefore(sets, weekStartedAt)

  const unsyncedSets = lastSyncedWeekEndedAt
    ? getSetsStartedAfter(previousWeekSets, lastSyncedWeekEndedAt)
    : previousWeekSets

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

  return {
    projects: newProjects,
    lastSyncedWeekEndedAt: weekStartedAt,
  }
}
