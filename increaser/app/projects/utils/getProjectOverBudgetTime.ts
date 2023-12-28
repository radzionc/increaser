import { EnhancedProject } from '@increaser/app/projects/Project'

export const getProjectOverBudgetTime = (project: EnhancedProject) =>
  project.doneMinutesThisWeek - project.allocatedMinutesPerWeek
