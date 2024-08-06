import { useTodaySets } from '../../../sets/hooks/useTodaySets'
import { getSetHash } from '@increaser/entities-utils/set/getSetHash'
import { useMemo } from 'react'
import { useStartTimeEditor } from './StartTimeEditorProvider'
import { SetItem } from '@increaser/ui/sets/manager/editor/SetItem'
import { setEditorConfig } from '@increaser/ui/sets/manager/editor/config'

export const Sessions = () => {
  const { interval } = useStartTimeEditor()
  const todaySets = useTodaySets()

  const sets = useMemo(() => {
    return todaySets.filter((set) => set.end > interval.start)
  }, [interval.start, todaySets])

  return (
    <>
      {sets.map((value, index) => (
        <SetItem
          key={getSetHash(value)}
          value={value}
          index={index}
          style={{
            top: setEditorConfig.msToPx(value.start - interval.start),
            height: setEditorConfig.msToPx(value.end - value.start),
          }}
        />
      ))}
    </>
  )
}
