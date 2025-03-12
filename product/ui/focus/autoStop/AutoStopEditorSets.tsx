import { useCurrentInterval } from '@lib/ui/state/currentInterval'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { areEqualIntervals } from '@lib/utils/interval/areEqualIntervals'
import { useLastSet } from '@product/app/sets/hooks/useLastSet'
import { getSetHash } from '@product/entities-utils/set/getSetHash'
import { setEditorConfig } from '@product/ui/sets/manager/editor/config'
import { SetItem } from '@product/ui/sets/manager/SetItem'
import { useMemo } from 'react'

import { useSets } from '../../sets/hooks/useSets'

export const AutoStopEditorSets = () => {
  const interval = useCurrentInterval()
  const allSets = useSets()
  const lastSet = shouldBePresent(useLastSet())

  const sets = useMemo(() => {
    return allSets.filter(
      (set) =>
        set.end > interval.start &&
        set.start < interval.end &&
        !areEqualIntervals(set, lastSet),
    )
  }, [allSets, interval.end, interval.start, lastSet])

  return (
    <>
      {sets.map((value) => (
        <SetItem
          key={getSetHash(value)}
          projectId={value.projectId}
          style={{
            position: 'absolute',
            top: setEditorConfig.msToPx(value.start - interval.start),
            height: setEditorConfig.msToPx(value.end - value.start),
          }}
        />
      ))}
    </>
  )
}
