import { getSetHash } from '@increaser/entities-utils/set/getSetHash'
import { useMemo } from 'react'
import { SetItem } from '@increaser/ui/sets/manager/SetItem'
import { setEditorConfig } from '@increaser/ui/sets/manager/editor/config'
import { useCurrentInterval } from '@lib/ui/state/currentInterval'
import { useSets } from '@increaser/ui/sets/hooks/useSets'

export const Sessions = () => {
  const interval = useCurrentInterval()
  const allSets = useSets()

  const sets = useMemo(() => {
    return allSets.filter(
      (set) => set.end > interval.start && set.start < interval.end,
    )
  }, [interval.end, interval.start, allSets])

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
