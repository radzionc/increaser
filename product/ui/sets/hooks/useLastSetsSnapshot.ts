import { useUser } from '@product/ui/user/state/user'

export const useLastSetsSnapshot = () => {
  const { lastSyncedMonthEndedAt, lastSyncedWeekEndedAt } = useUser()

  return Math.max(lastSyncedMonthEndedAt ?? 0, lastSyncedWeekEndedAt ?? 0)
}
