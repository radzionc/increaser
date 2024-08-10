import {
  PersistentStateKey,
  usePersistentState,
} from '@increaser/ui/state/persistentState'
import { useTrackedTimeMaxDataSize } from '../hooks/useTrackedTimeMaxDataSize'
import { useStateCorrector } from '@lib/ui/state/useStateCorrector'

export const useDataSize = () => {
  const maxDataSize = useTrackedTimeMaxDataSize()

  return useStateCorrector(
    usePersistentState<number | null>(
      PersistentStateKey.TrackedTimeReportDataSize,
      null,
    ),
    (state) => {
      if (state !== null && state > maxDataSize) {
        return maxDataSize
      }

      return state
    },
  )
}
