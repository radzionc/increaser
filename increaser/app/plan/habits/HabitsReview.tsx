import { useHabits } from '@increaser/ui/habits/HabitsContext'
import { SubmitYesterdayHabits } from '../../habits/components/SubmitYesterdayHabits'
import { useHaveToSubmitYesterdayHabits } from '../../habits/hooks/useHaveToSubmitYesterdayHabits'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { AddHabitsPrompt } from '../../habits/components/AddHabitsPrompt'
import { useYesterdayHabits } from '../../habits/hooks/useYesterdayHabits'
import { ShyInfoBlock } from '@lib/ui/info/ShyInfoBlock'
import { TodayHabitsGuidance } from './TodayHabitsGuidance'

export const HabitsReview = () => {
  const haveToSubmitYesterdayHabits = useHaveToSubmitYesterdayHabits()
  const { habits } = useHabits()
  const yesterdayHabits = useYesterdayHabits()

  return (
    <>
      {haveToSubmitYesterdayHabits ? (
        <SubmitYesterdayHabits />
      ) : isEmpty(habits) ? (
        <AddHabitsPrompt />
      ) : isEmpty(yesterdayHabits) ? (
        <ShyInfoBlock>You had no habits yesterday.</ShyInfoBlock>
      ) : (
        <TodayHabitsGuidance />
      )}
    </>
  )
}
