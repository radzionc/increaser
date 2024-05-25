import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { useYesterdayHabits } from './useYesterdayHabits'

export const useHaveToSubmitYesterdayHabits = () => {
  const { sumbittedHabitsAt } = useAssertUserState()
  const habits = useYesterdayHabits()
  const todayStartedAt = useStartOfDay()

  return (
    habits.length && (!sumbittedHabitsAt || sumbittedHabitsAt < todayStartedAt)
  )
}
