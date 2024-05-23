import { panelDefaultPadding } from '@lib/ui/panel/Panel'
import styled from 'styled-components'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { useTrackTime } from './state/TrackTimeContext'
import { TimeSpace } from '@lib/ui/timeline/TimeSpace'
import { msToPx } from './config'
import { Sessions } from './Sessions'
import { ScrollIntoViewOnFirstAppearance } from '@lib/ui/base/ScrollIntoViewOnFirstAppearance'
import { SetEditor } from './SetEditor'
import { VStack } from '@lib/ui/layout/Stack'
import { ScrollableFlexboxFiller } from '@lib/ui/layout/ScrollableFlexboxFiller'

const Content = styled(VStack)`
  padding: ${toSizeUnit(panelDefaultPadding)};
`

const DefaultScrollPosition = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
`

export const TrackTimeContent = () => {
  const { currentSet, dayInterval } = useTrackTime()

  return (
    <ScrollableFlexboxFiller>
      <Content>
        <TimeSpace
          msToPx={msToPx}
          startsAt={dayInterval.start}
          endsAt={dayInterval.end}
        >
          <Sessions />
          {currentSet && <SetEditor />}
          <ScrollIntoViewOnFirstAppearance<HTMLDivElement>
            render={(props) => <DefaultScrollPosition {...props} />}
          />
        </TimeSpace>
      </Content>
    </ScrollableFlexboxFiller>
  )
}
