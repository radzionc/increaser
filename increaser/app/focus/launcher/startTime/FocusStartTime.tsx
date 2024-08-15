import { FocusStartTimeInput } from './FocusStartTimeInput'
import { ChangeStartTimeSwitch } from './ChangeStartTimeSwitch'
import { VStack } from '@lib/ui/layout/Stack'
import { StartTimeEditorProvider } from './StartTimeEditorProvider'
import styled from 'styled-components'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { panelDefaultPadding } from '@lib/ui/panel/Panel'
import { useFocusLauncher } from '../state/useFocusLauncher'

const Container = styled(VStack)`
  padding: 0;
  > * {
    padding: ${toSizeUnit(panelDefaultPadding)};
  }
`

export const FocusStartTime = () => {
  const [{ startedAt }] = useFocusLauncher()

  return (
    <Container>
      <ChangeStartTimeSwitch />
      {startedAt && (
        <StartTimeEditorProvider>
          <FocusStartTimeInput />
        </StartTimeEditorProvider>
      )}
    </Container>
  )
}
