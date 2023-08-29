import { EnhancedProject } from 'projects/Project'

export const getProjectBudgetProgress = (project: EnhancedProject) =>
  project.doneMinutesThisWeek / project.allocatedMinutesPerWeek
