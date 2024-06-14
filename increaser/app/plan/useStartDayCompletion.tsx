import { useHasOverdueTasks } from '@increaser/ui/tasks/hooks/useHasOverdueTasks'
import { useHaveToSubmitYesterdayHabits } from '../habits/hooks/useHaveToSubmitYesterdayHabits'
import { useTodayTasks } from '@increaser/ui/tasks/hooks/useTodayTasks'

export const useStartDayCompletion = () => {
  const haveToSubmitYesterdayHabits = useHaveToSubmitYesterdayHabits()
  const hasOverdueTasks = useHasOverdueTasks()
  const todayTasks = useTodayTasks()

  return {
    yesterdayHabits: !haveToSubmitYesterdayHabits,
    todayTasks: !hasOverdueTasks && todayTasks.length > 0,
  }
}
