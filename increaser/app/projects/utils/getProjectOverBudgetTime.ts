import { EnhancedProject } from '@increaser/ui/projects/EnhancedProject'

export const getProjectOverBudgetTime = (project: EnhancedProject) =>
  project.doneMinutesThisWeek - project.allocatedMinutesPerWeek
