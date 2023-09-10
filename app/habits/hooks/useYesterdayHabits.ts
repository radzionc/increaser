import { useHabits } from 'habits/components/HabitsProvider'
import { useStartOfDay } from '@increaser/ui/hooks/useStartOfDay'
import { MS_IN_SEC } from '@increaser/utils/time'

export const useYesterdayHabits = () => {
  const { habits: currentHabits } = useHabits()
  const startOfToday = useStartOfDay()

  return currentHabits.filter(
    ({ startedAt }) => startedAt * MS_IN_SEC < startOfToday,
  )
}
