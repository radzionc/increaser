import { FocusStartTimeInput } from './FocusStartTimeInput'
import { ChangeStartTimeSwitch } from './ChangeStartTimeSwitch'
import { VStack } from '@lib/ui/css/stack'
import { StartTimeEditorProvider } from './StartTimeEditorProvider'
import styled from 'styled-components'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { panelDefaultPadding } from '@lib/ui/css/panel'
import { useFocusTargetStartTime } from '../state/FocusLauncherStartTimeProvider'

const Container = styled(VStack)`
  padding: 0;
  > * {
    padding: ${toSizeUnit(panelDefaultPadding)};
  }
`

export const FocusStartTime = () => {
  const [value] = useFocusTargetStartTime()

  return (
    <Container>
      <ChangeStartTimeSwitch />
      {value && (
        <StartTimeEditorProvider>
          <FocusStartTimeInput />
        </StartTimeEditorProvider>
      )}
    </Container>
  )
}
