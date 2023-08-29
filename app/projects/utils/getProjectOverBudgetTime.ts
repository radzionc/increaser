import { EnhancedProject } from 'projects/Project'

export const getProjectOverBudgetTime = (project: EnhancedProject) =>
  project.doneMinutesThisWeek - project.allocatedMinutesPerWeek
