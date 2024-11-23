import { VStack } from '@lib/ui/css/stack'
import { TimeSpace } from '@lib/ui/timeline/TimeSpace'
import { Sessions } from './Sessions'
import styled from 'styled-components'
import { StartTimeEditor } from './StartTimeEditor'
import { setEditorConfig } from '@increaser/ui/sets/manager/editor/config'
import { useCurrentInterval } from '@lib/ui/state/currentInterval'

const Content = styled(VStack)`
  overflow: hidden;
`

export const FocusStartTimeInput = () => {
  const interval = useCurrentInterval()

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
