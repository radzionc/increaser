import { EnhancedProject } from '@increaser/app/projects/Project'

export const getProjectBudgetProgress = (project: EnhancedProject) =>
  project.doneMinutesThisWeek / project.allocatedMinutesPerWeek
