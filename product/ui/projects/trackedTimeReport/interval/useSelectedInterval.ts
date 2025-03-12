import { useStateCorrector } from '@lib/ui/state/useStateCorrector'
import { Interval } from '@lib/utils/interval/Interval'
import {
  PersistentStateKey,
  usePersistentState,
} from '@product/ui/state/persistentState'

import { useTimeGrouping } from '../timeGrouping/state'
import { TimeGrouping } from '../timeGrouping/TimeGrouping'

import { useTotalIntervalLength } from './useTotalIntervalLength'

const stateKey: Record<TimeGrouping, PersistentStateKey> = {
  day: PersistentStateKey.TrackedTimeIntervalDays,
  week: PersistentStateKey.TrackedTimeIntervalWeeks,
  month: PersistentStateKey.TrackedTimeIntervalMonths,
  year: PersistentStateKey.TrackedTimeIntervalYears,
}

export const useSelectedInterval = () => {
  const maxIntervalLength = useTotalIntervalLength()

  const timeGrouping = useTimeGrouping()

  return useStateCorrector(
    usePersistentState<Interval>(stateKey[timeGrouping], () => ({
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
