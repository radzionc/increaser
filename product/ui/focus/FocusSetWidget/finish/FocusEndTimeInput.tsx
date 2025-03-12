import { VStack } from '@lib/ui/css/stack'
import { useCurrentInterval } from '@lib/ui/state/currentInterval'
import { TimeSpace } from '@lib/ui/timeline/TimeSpace'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { FocusEndTimeEditor } from '@product/ui/focus/end/FocusEndTimeEditor'
import { setEditorConfig } from '@product/ui/sets/manager/editor/config'
import styled from 'styled-components'

import { useAssertFocusIntervals } from '../../state/focusIntervals'

import { FocusEndTimeEditorSets } from './FocusEndTimeEditorSets'
import { useCurrentFocusEndTime } from './state/CurrentFocusEndTime'

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
