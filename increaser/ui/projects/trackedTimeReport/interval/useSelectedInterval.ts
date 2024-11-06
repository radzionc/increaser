import {
  PersistentStateKey,
  usePersistentState,
} from '@increaser/ui/state/persistentState'
import { useStateCorrector } from '@lib/ui/state/useStateCorrector'
import { Interval } from '@lib/utils/interval/Interval'
import { useTotalIntervalLength } from './useTotalIntervalLength'
import { useTimeGrouping } from '../timeGrouping/useTimeGrouping'
import { TimeGrouping } from '../timeGrouping/TimeGrouping'

const stateKey: Record<TimeGrouping, PersistentStateKey> = {
  day: PersistentStateKey.TrackedTimeIntervalDays,
  week: PersistentStateKey.TrackedTimeIntervalWeeks,
  month: PersistentStateKey.TrackedTimeIntervalMonths,
  year: PersistentStateKey.TrackedTimeIntervalYears,
}

export const useSelectedInterval = () => {
  const maxIntervalLength = useTotalIntervalLength()

  const [group] = useTimeGrouping()

  return useStateCorrector(
    usePersistentState<Interval>(stateKey[group], () => ({
      start: 0,
      end: maxIntervalLength - 1,
    })),
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
