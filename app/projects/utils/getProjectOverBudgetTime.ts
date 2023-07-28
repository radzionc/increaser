import { Project } from 'projects/Project'

export const getProjectOverBudgetTime = (project: Project) =>
  project.doneMinutesThisWeek - project.allocatedMinutesPerWeek
