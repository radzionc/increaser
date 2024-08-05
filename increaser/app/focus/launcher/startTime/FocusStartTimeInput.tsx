import { VStack } from '@lib/ui/layout/Stack'
import { TimeSpace } from '@lib/ui/timeline/TimeSpace'
import { Sessions } from './Sessions'
import styled from 'styled-components'
import { useStartTimeEditor } from './StartTimeEditorProvider'
import { StartTimeEditor } from './StartTimeEditor'
import { dayOverviewConfig } from '../../../sets/components/DayOverview/config'

const Content = styled(VStack)`
  overflow: hidden;
`

export const FocusStartTimeInput = () => {
  const { interval } = useStartTimeEditor()

  return (
    <Content>
      <TimeSpace
        startsAt={interval.start}
        endsAt={interval.end}
        msToPx={dayOverviewConfig.editor.msToPx}
      >
        <Sessions />
        <StartTimeEditor />
      </TimeSpace>
    </Content>
  )
}
