import { useTodaySets } from '../../../sets/hooks/useTodaySets'
import { getSetHash } from '../../../sets/helpers/getSetHash'
import { useMemo } from 'react'
import { useStartTimeEditor } from './StartTimeEditorProvider'
import { dayOverviewConfig } from '../../../sets/components/DayOverview/config'
import { SetItem } from '../../../sets/components/DayOverview/editor/SetItem'

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
            top: dayOverviewConfig.editor.msToPx(value.start - interval.start),
            height: dayOverviewConfig.editor.msToPx(value.end - value.start),
          }}
        />
      ))}
    </>
  )
}
