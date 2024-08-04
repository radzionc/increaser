import { panelDefaultPadding } from '@lib/ui/panel/Panel'
import styled from 'styled-components'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { TimeSpace } from '@lib/ui/timeline/TimeSpace'
import { ScrollIntoViewOnFirstAppearance } from '@lib/ui/base/ScrollIntoViewOnFirstAppearance'
import { VStack } from '@lib/ui/layout/Stack'
import { ScrollableFlexboxFiller } from '@lib/ui/layout/ScrollableFlexboxFiller'
import { msToPx } from '../config'
import { useWeekdayPassedInterval } from '@lib/ui/time/hooks/useWeekdayPassedInterval'
import { useSelectedWeekday } from '@lib/ui/time/SelectedWeekdayProvider'
import { Sets } from './Sets'
import { SetEditor } from './SetEditor'

const Content = styled(VStack)`
  padding: ${toSizeUnit(panelDefaultPadding)};
`

const DefaultScrollPosition = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
`

export const SetEditorContent = () => {
  const [weekday] = useSelectedWeekday()
  const { start, end } = useWeekdayPassedInterval(weekday)
  return (
    <ScrollableFlexboxFiller>
      <Content>
        <TimeSpace msToPx={msToPx} startsAt={start} endsAt={end}>
          <Sets />
          <SetEditor />
          <ScrollIntoViewOnFirstAppearance<HTMLDivElement>
            render={(props) => <DefaultScrollPosition {...props} />}
          />
        </TimeSpace>
      </Content>
    </ScrollableFlexboxFiller>
  )
}
