import { VStack } from '@lib/ui/css/stack'
import { TimeSpace } from '@lib/ui/timeline/TimeSpace'
import { Sessions } from './Sessions'
import styled from 'styled-components'
import { useStartTimeEditor } from './StartTimeEditorProvider'
import { StartTimeEditor } from './StartTimeEditor'
import { setEditorConfig } from '@increaser/ui/sets/manager/editor/config'

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
        msToPx={setEditorConfig.msToPx}
      >
        <Sessions />
        <StartTimeEditor />
      </TimeSpace>
    </Content>
  )
}
