import { VStack } from '@lib/ui/css/stack'
import { useCurrentInterval } from '@lib/ui/state/currentInterval'
import { TimeSpace } from '@lib/ui/timeline/TimeSpace'
import { setEditorConfig } from '@product/ui/sets/manager/editor/config'
import styled from 'styled-components'

import { Sessions } from './Sessions'
import { StartTimeEditor } from './StartTimeEditor'

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
