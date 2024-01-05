import { EnhancedProject } from '@increaser/ui/projects/EnhancedProject'

export const getProjectBudgetProgress = (project: EnhancedProject) =>
  project.doneMinutesThisWeek / project.allocatedMinutesPerWeek
