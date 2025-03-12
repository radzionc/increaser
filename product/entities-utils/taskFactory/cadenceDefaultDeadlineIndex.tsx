import { TaskCadence } from '@product/entities/TaskFactory'

export const cadenceDefaultDeadlineIndex: Record<TaskCadence, number | null> = {
  day: null,
  workday: null,
  week: 0,
  month: 0,
}
