import { SubmitYesterdayHabits } from '../habits/components/SubmitYesterdayHabits'
import { useHaveToSubmitYesterdayHabits } from '../habits/hooks/useHaveToSubmitYesterdayHabits'

export const HabitsReview = () => {
  const haveToSubmitYesterdayHabits = useHaveToSubmitYesterdayHabits()

  if (haveToSubmitYesterdayHabits) {
    return <SubmitYesterdayHabits />
  }

  return null
}
