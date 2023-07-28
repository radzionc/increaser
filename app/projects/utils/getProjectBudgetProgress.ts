import { Project } from 'projects/Project'

export const getProjectBudgetProgress = (project: Project) =>
  project.doneMinutesThisWeek / project.allocatedMinutesPerWeek
