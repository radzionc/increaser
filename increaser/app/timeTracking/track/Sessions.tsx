import { useTrackTime } from './state/TrackTimeContext'
import { msToPx } from './config'
import { Session } from './Session'
import { getSetHash } from '../../sets/helpers/getSetHash'

export const Sessions = () => {
  const { dayInterval, sets } = useTrackTime()

  return (
    <>
      {sets.map((value, index) => (
        <Session
          key={getSetHash(value)}
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
