import { useAssertUserState } from '../../user/UserStateContext'

export const useLastSetsSnapshot = () => {
  const { lastSyncedMonthEndedAt, lastSyncedWeekEndedAt } = useAssertUserState()

  return Math.max(lastSyncedMonthEndedAt ?? 0, lastSyncedWeekEndedAt ?? 0)
}
