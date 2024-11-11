import { useMemo } from 'react'
import { useLastSetsSnapshot } from '../../sets/hooks/useLastSetsSnapshot'
import { LastSetAutoStopOverlay } from './LastSetAutoStopOverlay'
import { SetEndTimeProvider } from './state/setEndTime'
import { useLastSet } from '@increaser/app/sets/hooks/useLastSet'

export const LastSetObserver = () => {
  const lastSet = useLastSet()

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
