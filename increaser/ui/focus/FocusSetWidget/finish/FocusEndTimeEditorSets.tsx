import { getSetHash } from '@increaser/entities-utils/set/getSetHash'
import { SetItem } from '@increaser/ui/sets/manager/SetItem'
import { setEditorConfig } from '@increaser/ui/sets/manager/editor/config'
import { useCurrentInterval } from '@lib/ui/state/currentInterval'
import { useSets } from '@increaser/ui/sets/hooks/useSets'

export const FocusEndTimeEditorSets = () => {
  const interval = useCurrentInterval()

  const sets = useSets()

  return (
    <>
      {sets.slice(0, -1).map((value) => (
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
