import { useMemo } from 'react'
import { useAssertUserState } from '../../user/UserStateContext'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { useLastSetsSnapshot } from '../../sets/hooks/useLastSetsSnapshot'
import { LastSetAutoStopOverlay } from './LastSetAutoStopOverlay'
import { SetEndTimeProvider } from './state/setEndTime'

export const LastSetObserver = () => {
  const { sets } = useAssertUserState()
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
