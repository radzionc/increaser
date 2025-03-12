import { useLastSet } from '@product/app/sets/hooks/useLastSet'
import { useMemo } from 'react'

import { useLastSetsSnapshot } from '../../sets/hooks/useLastSetsSnapshot'

import { LastSetAutoStopOverlay } from './LastSetAutoStopOverlay'
import { SetEndTimeProvider } from './state/setEndTime'

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
