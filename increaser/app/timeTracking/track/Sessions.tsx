import { useTrackTime } from './state/TrackTimeContext'
import { msToPx } from './config'
import { Session } from './Session'

export const Sessions = () => {
  const { dayInterval, sets } = useTrackTime()

  return (
    <>
      {sets.map((value, index) => (
        <Session
          key={index}
          value={value}
          index={index}
          style={{
            top: msToPx(value.start - dayInterval.start),
            height: msToPx(value.end - value.start),
          }}
        />
      ))}
    </>
  )
}
