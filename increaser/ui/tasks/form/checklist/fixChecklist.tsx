import { TaskChecklistItem } from '@increaser/entities/Task'

export const fixChecklist = (value: TaskChecklistItem[]): TaskChecklistItem[] =>
  value.filter((value) => value.name.trim() !== '')
