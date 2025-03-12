import { useCurrentInterval } from '@lib/ui/state/currentInterval'
import { getSetHash } from '@product/entities-utils/set/getSetHash'
import { useSets } from '@product/ui/sets/hooks/useSets'
import { setEditorConfig } from '@product/ui/sets/manager/editor/config'
import { SetItem } from '@product/ui/sets/manager/SetItem'

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
