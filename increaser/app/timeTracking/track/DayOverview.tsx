import styled from 'styled-components'
import { useTrackTime } from './TrackTimeProvider'
import { VStack } from '@lib/ui/layout/Stack'
import { TimeSpace } from '@lib/ui/timeline/TimeSpace'
import { MS_IN_HOUR } from '@lib/utils/time'
import { WorkSession } from '../../sets/components/DayOverview/WorkBlocks/WorkSession'
import { ScrollIntoViewOnFirstAppearance } from '@lib/ui/base/ScrollIntoViewOnFirstAppearance'

const Content = styled(VStack)`
  max-height: 520px;
  overflow-y: auto;
`

const pxInHour = 100
const pxInMs = pxInHour / MS_IN_HOUR
const msToPx = (ms: number) => ms * pxInMs

const DefaultScrollPosition = styled.div`
  position: absolute;
  left: 0;
`

export const DayOverview = () => {
  const { dayInterval, sets } = useTrackTime()

  return (
    <Content>
      <TimeSpace
        msToPx={msToPx}
        startsAt={dayInterval.start}
        endsAt={dayInterval.end}
      >
        {sets.map((set, index) => (
          <WorkSession
            key={index}
            set={set}
            showIdentifier
            style={{
              top: msToPx(set.start - dayInterval.start),
              height: msToPx(set.end - set.start),
            }}
          />
        ))}
        <ScrollIntoViewOnFirstAppearance<HTMLDivElement>
          render={(props) => (
            <DefaultScrollPosition style={{ bottom: 0 }} {...props} />
          )}
        />
      </TimeSpace>
    </Content>
  )
}
