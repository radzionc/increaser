import {
  PersistentStateKey,
  usePersistentState,
} from '@increaser/ui/state/persistentState'
import { useStateCorrector } from '@lib/ui/state/useStateCorrector'
import { useMaxDataSize } from './useMaxDataSize'

export const useDataSize = () => {
  const maxDataSize = useMaxDataSize()

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
