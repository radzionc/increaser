import { FocusStartTimeInput } from './FocusStartTimeInput'
import { ChangeStartTimeSwitch } from './ChangeStartTimeSwitch'
import { VStack } from '@lib/ui/css/stack'
import styled from 'styled-components'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { panelDefaultPadding } from '@lib/ui/css/panel'
import { useFocusTargetStartTime } from '../state/FocusLauncherStartTimeProvider'
import { StartTimeEditorIntervalProvider } from './StartTimeEditorIntervalProvider'
import { FocusEntityInputWrapper } from '../focusEntity/FocusEntityInputWrapper'

const Container = styled(VStack)`
  padding: 0;
  > * {
    padding: ${toSizeUnit(panelDefaultPadding)};
  }
`

export const FocusStartTime = () => {
  const [value] = useFocusTargetStartTime()

  return (
    <FocusEntityInputWrapper label="Focus start time">
      <Container>
        <ChangeStartTimeSwitch />
        {value && (
          <StartTimeEditorIntervalProvider>
            <FocusStartTimeInput />
          </StartTimeEditorIntervalProvider>
        )}
      </Container>
    </FocusEntityInputWrapper>
  )
}
