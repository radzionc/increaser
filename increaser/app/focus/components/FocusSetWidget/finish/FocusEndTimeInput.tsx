import { VStack } from '@lib/ui/css/stack'
import { TimeSpace } from '@lib/ui/timeline/TimeSpace'
import styled from 'styled-components'
import { setEditorConfig } from '@increaser/ui/sets/manager/editor/config'
import { useCurrentInterval } from '@lib/ui/state/currentInterval'
import { FocusEndTimeEditorSets } from './FocusEndTimeEditorSets'
import { EndTimeEditor } from './EndTimeEditor'

const Content = styled(VStack)`
  overflow: hidden;
`

export const FocusEndTimeInput = () => {
  const interval = useCurrentInterval()

  return (
    <Content>
      <TimeSpace
        startsAt={interval.start}
        endsAt={interval.end}
        msToPx={setEditorConfig.msToPx}
        verticalPadding={20}
      >
        <FocusEndTimeEditorSets />
        <EndTimeEditor />
      </TimeSpace>
    </Content>
  )
}
