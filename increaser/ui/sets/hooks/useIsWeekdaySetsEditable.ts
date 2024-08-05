import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useStartOfWeekday } from '@lib/ui/time/hooks/useStartOfWeekday'

export const useIsWeekdaySetsEditable = (weekday: number) => {
  const { lastSyncedMonthEndedAt, lastSyncedWeekEndedAt } = useAssertUserState()

  const weekdayStartedAt = useStartOfWeekday(weekday)

  const minStartedAt = Math.max(
    lastSyncedMonthEndedAt ?? 0,
    lastSyncedWeekEndedAt ?? 0,
  )

  return weekdayStartedAt >= minStartedAt
}
