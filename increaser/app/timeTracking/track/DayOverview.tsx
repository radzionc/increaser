import styled from 'styled-components'
import { useTrackTime } from './state/TrackTimeContext'
import { TimeSpace } from '@lib/ui/timeline/TimeSpace'
import { ScrollIntoViewOnFirstAppearance } from '@lib/ui/base/ScrollIntoViewOnFirstAppearance'
import { msToPx } from './config'
import { Sessions } from './Sessions'

const DefaultScrollPosition = styled.div`
  position: absolute;
  left: 0;
`

export const DayOverview = () => {
  const { dayInterval } = useTrackTime()

  return (
    <TimeSpace
      msToPx={msToPx}
      startsAt={dayInterval.start}
      endsAt={dayInterval.end}
    >
      <Sessions />
      <ScrollIntoViewOnFirstAppearance<HTMLDivElement>
        render={(props) => (
          <DefaultScrollPosition style={{ bottom: 0 }} {...props} />
        )}
      />
    </TimeSpace>
  )
}
