import { VStack } from '@lib/ui/css/stack'
import { TimeSpace } from '@lib/ui/timeline/TimeSpace'
import styled from 'styled-components'
import { setEditorConfig } from '@increaser/ui/sets/manager/editor/config'
import { useCurrentInterval } from '@lib/ui/state/currentInterval'
import { AutoStopEditorSets } from './AutoStopEditorSets'
import { useSetEndTime } from './state/setEndTime'
import { FocusEndTimeEditor } from '../end/FocusEndTimeEditor'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useLastSet } from '@increaser/app/sets/hooks/useLastSet'

const Content = styled(VStack)`
  overflow: hidden;
`

export const AutoStoppedSetEndTimeInput = () => {
  const interval = useCurrentInterval()

  const [value, setValue] = useSetEndTime()

  const { projectId, start } = shouldBePresent(useLastSet())

  return (
    <Content>
      <TimeSpace
        startsAt={interval.start}
        endsAt={interval.end}
        msToPx={setEditorConfig.msToPx}
        verticalPadding={20}
      >
        <AutoStopEditorSets />
        <FocusEndTimeEditor
          projectId={projectId}
          start={start}
          value={value}
          onChange={setValue}
        />
      </TimeSpace>
    </Content>
  )
}
