import { useHabits } from '@increaser/ui/habits/HabitsContext'
import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { MS_IN_SEC } from '@lib/utils/time'

export const useYesterdayHabits = () => {
  const { habits: currentHabits } = useHabits()
  const startOfToday = useStartOfDay()

  return currentHabits.filter(
    ({ startedAt }) => startedAt * MS_IN_SEC < startOfToday,
  )
}
