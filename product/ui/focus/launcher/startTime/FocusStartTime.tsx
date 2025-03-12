import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { Panel, panelDefaultPadding } from '@lib/ui/css/panel'
import { VStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { Text } from '@lib/ui/text'
import { formatTime } from '@lib/utils/time/formatTime'
import styled from 'styled-components'

import { focusEntityConfig } from '../focusEntity/config'
import { FocusLauncherField } from '../FocusLauncherField'
import { useFocusTargetStartTime } from '../state/FocusLauncherStartTimeProvider'

import { ChangeStartTimeSwitch } from './ChangeStartTimeSwitch'
import { FocusStartTimeInput } from './FocusStartTimeInput'
import { StartTimeEditorIntervalProvider } from './StartTimeEditorIntervalProvider'

const Container = styled(VStack)`
  padding: 0;

  > * {
    padding: ${toSizeUnit(panelDefaultPadding)};
  }

  > *:first-child {
    ${horizontalPadding(panelDefaultPadding)};
    ${verticalPadding(0)};
    height: ${toSizeUnit(focusEntityConfig.height)};
  }
`

export const FocusStartTime = () => {
  const [value] = useFocusTargetStartTime()

  return (
    <FocusLauncherField
      label={
        <span>
          Focus start time:{' '}
          <Text as="span" color="contrast">
            {value ? formatTime(value) : 'now'}
          </Text>
        </span>
      }
    >
      <Panel kind="secondary" withSections>
        <Container>
          <ChangeStartTimeSwitch />
          {value && (
            <StartTimeEditorIntervalProvider>
              <FocusStartTimeInput />
            </StartTimeEditorIntervalProvider>
          )}
        </Container>
      </Panel>
    </FocusLauncherField>
  )
}
