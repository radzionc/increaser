import { useTrackTime } from './state/TrackTimeContext'
import { msToPx } from './config'
import { Session } from './Session'
import { getSetHash } from '../../sets/helpers/getSetHash'

export const Sessions = () => {
  const { dayInterval, sets, currentSet, setState } = useTrackTime()

  return (
    <>
      {sets.map((value, index) =>
        currentSet?.index === index ? null : (
          <Session
            key={getSetHash(value)}
            value={value}
            index={index}
            onSelect={
              currentSet
                ? undefined
                : () => {
                    setState((state) => ({
                      ...state,
                      currentSet: {
                        ...value,
                        index,
                      },
                    }))
                  }
            }
            style={{
              top: msToPx(value.start - dayInterval.start),
              height: msToPx(value.end - value.start),
            }}
          />
        ),
      )}
    </>
  )
}
