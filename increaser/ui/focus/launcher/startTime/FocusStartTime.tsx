import { FocusStartTimeInput } from './FocusStartTimeInput'
import { ChangeStartTimeSwitch } from './ChangeStartTimeSwitch'
import { VStack } from '@lib/ui/css/stack'
import styled from 'styled-components'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { panelDefaultPadding } from '@lib/ui/css/panel'
import { useFocusTargetStartTime } from '../state/FocusLauncherStartTimeProvider'
import { StartTimeEditorIntervalProvider } from './StartTimeEditorIntervalProvider'
import { FocusEntityInputWrapper } from '../focusEntity/FocusEntityInputWrapper'
import { focusEntityConfig } from '../focusEntity/config'
import { Text } from '@lib/ui/text'
import { formatTime } from '@lib/utils/time/formatTime'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { verticalPadding } from '@lib/ui/css/verticalPadding'

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
    <FocusEntityInputWrapper
      label={
        <>
          Focus start time:{' '}
          <Text as="span" color="contrast">
            {value ? formatTime(value) : 'now'}
          </Text>
        </>
      }
    >
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
