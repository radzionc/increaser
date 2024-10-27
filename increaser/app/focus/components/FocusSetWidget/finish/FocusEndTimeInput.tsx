import { VStack } from '@lib/ui/css/stack'
import { TimeSpace } from '@lib/ui/timeline/TimeSpace'
import styled from 'styled-components'
import { setEditorConfig } from '@increaser/ui/sets/manager/editor/config'
import { useCurrentInterval } from '@lib/ui/state/currentInterval'
import { FocusEndTimeEditorSets } from './FocusEndTimeEditorSets'
import { FocusEndTimeEditor } from '@increaser/ui/focus/end/FocusEndTimeEditor'
import { useCurrentFocusEndTime } from './state/CurrentFocusEndTime'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { useAssertFocusIntervals } from '../../../state/focusIntervals'

const Content = styled(VStack)`
  overflow: hidden;
`

export const FocusEndTimeInput = () => {
  const interval = useCurrentInterval()

  const [value, onChange] = useCurrentFocusEndTime()

  const intervals = useAssertFocusIntervals()

  const { projectId, start } = getLastItem(intervals)

  return (
    <Content>
      <TimeSpace
        startsAt={interval.start}
        endsAt={interval.end}
        msToPx={setEditorConfig.msToPx}
        verticalPadding={20}
      >
        <FocusEndTimeEditorSets />
        <FocusEndTimeEditor
          projectId={projectId}
          start={start}
          value={value}
          onChange={onChange}
        />
      </TimeSpace>
    </Content>
  )
}
