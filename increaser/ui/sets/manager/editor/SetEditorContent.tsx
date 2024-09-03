import { panelDefaultPadding } from '@lib/ui/css/panel'
import styled from 'styled-components'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { TimeSpace } from '@lib/ui/timeline/TimeSpace'
import { VStack } from '@lib/ui/layout/Stack'
import { ScrollableFlexboxFiller } from '@lib/ui/layout/ScrollableFlexboxFiller'
import { useWeekdayPassedInterval } from '@lib/ui/time/hooks/useWeekdayPassedInterval'
import { useSelectedWeekday } from '@lib/ui/time/SelectedWeekdayProvider'
import { Sets } from './Sets'
import { SetEditor } from './SetEditor'
import { setEditorConfig } from './config'
import { ActiveControlProvider } from './ActiveControlProvider'

const Content = styled(VStack)`
  padding: ${toSizeUnit(panelDefaultPadding)};
`

export const SetEditorContent = () => {
  const [weekday] = useSelectedWeekday()
  const { start, end } = useWeekdayPassedInterval(weekday)
  return (
    <ScrollableFlexboxFiller>
      <Content>
        <TimeSpace
          msToPx={setEditorConfig.msToPx}
          startsAt={start}
          endsAt={end}
        >
          <ActiveControlProvider initialValue={null}>
            <Sets />
            <SetEditor />
          </ActiveControlProvider>
        </TimeSpace>
      </Content>
    </ScrollableFlexboxFiller>
  )
}
