import { getSetsSum } from 'sets/helpers/getSetsSum'
import { useCurrentWeekSets } from 'sets/hooks/useCurrentWeekSets'
import { useWeekday } from '@increaser/ui/hooks/useWeekday'
import { match } from '@increaser/utils/match'
import { sum } from '@increaser/utils/array/sum'
import { useAssertUserState } from 'user/state/UserStateContext'
import { MS_IN_MIN } from '@increaser/utils/time'
import { useWeekTimeAllocation } from 'weekTimeAllocation/hooks/useWeekTimeAllocation'
import { WeekdaysProgressBar } from './WeekdaysProgressBar'

export const CurrentWeekProgressBar = () => {
  const { allocation, totalMinutes } = useWeekTimeAllocation()

  const { primaryGoal } = useAssertUserState()

  const weekday = useWeekday()

  const sets = useCurrentWeekSets()

  const doneMinutes = Math.round(getSetsSum(sets) / MS_IN_MIN)

  return (
    <WeekdaysProgressBar
      target={sum(allocation.filter((_, index) => index <= weekday))}
      value={doneMinutes}
      goal={match(primaryGoal, {
        workLess: () => 'less',
        workMore: () => 'more',
        awareness: () => 'awareness',
      })}
      total={totalMinutes}
    />
  )
}
