import { useCurrentInterval } from '@lib/ui/state/currentInterval'
import { getSetHash } from '@product/entities-utils/set/getSetHash'
import { useSets } from '@product/ui/sets/hooks/useSets'
import { setEditorConfig } from '@product/ui/sets/manager/editor/config'
import { SetItem } from '@product/ui/sets/manager/SetItem'
import { useMemo } from 'react'

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
