import { getSetHash } from '@increaser/entities-utils/set/getSetHash'
import { useMemo } from 'react'
import { SetItem } from '@increaser/ui/sets/manager/SetItem'
import { setEditorConfig } from '@increaser/ui/sets/manager/editor/config'
import { useCurrentInterval } from '@lib/ui/state/currentInterval'
import { useUser } from '@increaser/ui/user/state/user'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useLastSet } from '@increaser/app/sets/hooks/useLastSet'
import { areEqualIntervals } from '@lib/utils/interval/areEqualIntervals'

export const AutoStopEditorSets = () => {
  const interval = useCurrentInterval()
  const { sets: allSets } = useUser()
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
