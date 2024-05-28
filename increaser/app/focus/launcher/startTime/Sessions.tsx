import { useTodaySets } from '../../../sets/hooks/useTodaySets'
import { Session } from '../../../timeTracking/track/Session'
import { getSetHash } from '../../../sets/helpers/getSetHash'
import { msToPx } from '../../../timeTracking/track/config'
import { useMemo } from 'react'
import { useStartTimeEditor } from './StartTimeEditorProvider'

export const Sessions = () => {
  const { interval } = useStartTimeEditor()
  const todaySets = useTodaySets()

  const sets = useMemo(() => {
    return todaySets.filter((set) => set.end > interval.start)
  }, [interval.start, todaySets])

  return (
    <>
      {sets.map((value, index) => (
        <Session
          key={getSetHash(value)}
          value={value}
          index={index}
          style={{
            top: msToPx(value.start - interval.start),
            height: msToPx(value.end - value.start),
          }}
        />
      ))}
    </>
  )
}
