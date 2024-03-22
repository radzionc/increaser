import { Project } from '@increaser/entities/Project'
import { Set, User } from '@increaser/entities/User'
import { setToProjectWeek } from '@increaser/entities-utils/project/setToProjectWeek'
import { mergeIntoProjectWeeks } from '@increaser/entities-utils/project/mergeIntoProjectWeeks'
import { inTimeZone } from '@lib/utils/time/inTimeZone'
import { getWeekStartedAt } from '@lib/utils/time/getWeekStartedAt'
import { groupSetsByProject } from '@increaser/entities-utils/set/groupSetsByProject'
import { getSetsFinishedBefore } from '@increaser/entities-utils/set/getSetsFinishedBefore'
import { getSetsStartedAfter } from '@increaser/entities-utils/set/getSetsStartedAfter'

const addNewSetsToProject = (project: Project, sets: Set[]) => {
  let weeks = [...project.weeks]
  sets.map(setToProjectWeek).forEach((week) => {
    weeks = mergeIntoProjectWeeks(weeks, week)
  })

  return {
    ...project,
    weeks,
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
