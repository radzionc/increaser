import { panelDefaultPadding } from '@lib/ui/css/panel'
import { VStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { ScrollableFlexboxFiller } from '@lib/ui/layout/ScrollableFlexboxFiller'
import { useWeekdayPassedInterval } from '@lib/ui/time/hooks/useWeekdayPassedInterval'
import { useSelectedWeekday } from '@lib/ui/time/SelectedWeekdayProvider'
import { TimeSpace } from '@lib/ui/timeline/TimeSpace'
import styled from 'styled-components'

import { ActiveControlProvider } from './ActiveControlProvider'
import { setEditorConfig } from './config'
import { SetEditor } from './SetEditor'
import { Sets } from './Sets'

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
