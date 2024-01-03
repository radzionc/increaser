import { getSetsSum } from '@increaser/app/sets/helpers/getSetsSum'
import { useCurrentWeekSets } from '@increaser/app/sets/hooks/useCurrentWeekSets'
import { useWeekday } from '@lib/ui/hooks/useWeekday'
import { match } from '@lib/utils/match'
import { sum } from '@lib/utils/array/sum'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { MS_IN_MIN } from '@lib/utils/time'
import { useWeekTimeAllocation } from '@increaser/app/weekTimeAllocation/hooks/useWeekTimeAllocation'
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
