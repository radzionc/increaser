import { useTodaySets } from '../../../sets/hooks/useTodaySets'
import { getSetHash } from '@increaser/entities-utils/set/getSetHash'
import { useMemo } from 'react'
import { SetItem } from '@increaser/ui/sets/manager/SetItem'
import { setEditorConfig } from '@increaser/ui/sets/manager/editor/config'
import { useCurrentInterval } from '@lib/ui/state/currentInterval'

export const Sessions = () => {
  const interval = useCurrentInterval()
  const todaySets = useTodaySets()

  const sets = useMemo(() => {
    return todaySets.filter((set) => set.end > interval.start)
  }, [interval.start, todaySets])

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
