import { VStack } from '@lib/ui/css/stack'
import { useCurrentInterval } from '@lib/ui/state/currentInterval'
import { TimeSpace } from '@lib/ui/timeline/TimeSpace'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useLastSet } from '@product/app/sets/hooks/useLastSet'
import { setEditorConfig } from '@product/ui/sets/manager/editor/config'
import styled from 'styled-components'

import { FocusEndTimeEditor } from '../end/FocusEndTimeEditor'

import { AutoStopEditorSets } from './AutoStopEditorSets'
import { useSetEndTime } from './state/setEndTime'

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
