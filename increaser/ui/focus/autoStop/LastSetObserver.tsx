import { useMemo } from 'react'
import { useUser } from '@increaser/ui/user/state/user'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { useLastSetsSnapshot } from '../../sets/hooks/useLastSetsSnapshot'
import { LastSetAutoStopOverlay } from './LastSetAutoStopOverlay'
import { SetEndTimeProvider } from './state/setEndTime'

export const LastSetObserver = () => {
  const { sets } = useUser()
  const lastSet = getLastItem(sets)

  const lastSnapshotAt = useLastSetsSnapshot()

  const shouldBeEdited = useMemo(() => {
    if (!lastSet || !lastSet.isEndEstimated) {
      return false
    }

    return lastSet.start > lastSnapshotAt
  }, [lastSet, lastSnapshotAt])

  if (shouldBeEdited) {
    return (
      <SetEndTimeProvider>
        <LastSetAutoStopOverlay />
      </SetEndTimeProvider>
    )
  }

  return null
}
