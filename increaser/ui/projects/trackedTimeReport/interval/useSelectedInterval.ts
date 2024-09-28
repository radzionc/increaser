import {
  PersistentStateKey,
  usePersistentState,
} from '@increaser/ui/state/persistentState'
import { useStateCorrector } from '@lib/ui/state/useStateCorrector'
import { Interval } from '@lib/utils/interval/Interval'
import { useTotalIntervalLength } from './useTotalIntervalLength'

export const useSelectedInterval = () => {
  const maxIntervalLength = useTotalIntervalLength()

  return useStateCorrector(
    usePersistentState<Interval>(
      PersistentStateKey.TrackedTimeInterval,
      () => ({ start: 0, end: maxIntervalLength - 1 }),
    ),
    (value) => {
      if (value.end >= maxIntervalLength) {
        const end = maxIntervalLength - 1
        return {
          start: value.start < end ? value.start : 0,
          end,
        }
      }

      return value
    },
  )
}
