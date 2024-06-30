import {
  focusAduioModeName,
  focusAudioModes,
  useFocusAudioMode,
} from './state/useFocusAudioMode'
import { Match } from '@lib/ui/base/Match'
import { YouTubeFocusWidget } from './youTube/YouTubeFocusWidget'
import { SoundsFocusWidget } from './sounds/SoundsFocusWidget'
import { useIsFocusAudioEnabled } from './state/useIsFocusAudioEnabled'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import styled from 'styled-components'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { getColor } from '@lib/ui/theme/getters'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { Switch } from '@lib/ui/inputs/Switch'
import { RadioInput } from '@lib/ui/inputs/RadioInput'
import { centerContent } from '@lib/ui/css/centerContent'
import { CollapsableStateIndicator } from '@lib/ui/layout/CollapsableStateIndicator'
import { Line } from '@lib/ui/layout/Line'
import {
  PersistentStateKey,
  usePersistentState,
} from '@increaser/ui/state/persistentState'
import { FocusIconButton } from '../components/FocusSetWidget/FocusIconButton'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { focusSetWidgetConfig } from '../components/FocusSetWidget/config'

const Container = styled(VStack)`
  padding: 0;
  background: ${getColor('background')};
  > * {
    ${horizontalPadding(focusSetWidgetConfig.padding)}
  }
`

const Content = styled(VStack)`
  padding: 0;
  > * {
    ${horizontalPadding(focusSetWidgetConfig.padding)}
  }
  gap: 20px;
`

const Header = styled(HStack)`
  padding: 0;
  > * {
    padding: ${toSizeUnit(focusSetWidgetConfig.padding)};
  }
`

const CollapseButtonWr = styled(VStack)`
  ${centerContent};
  ${verticalPadding(0)};
`

export const FocusAudioWidget = () => {
  const [isEnabled, setIsEnabled] = useIsFocusAudioEnabled()
  const [isExpanded, setIsExpanded] = usePersistentState<boolean>(
    PersistentStateKey.AreFocusSoundsCollapsed,
    false,
  )
  const [mode, setMode] = useFocusAudioMode()

  return (
    <Container>
      <Header>
        <Switch
          style={{ flex: 1 }}
          label="Focus sounds"
          value={isEnabled}
          onChange={setIsEnabled}
        />
        {isEnabled && (
          <CollapseButtonWr>
            <FocusIconButton
              onClick={() => setIsExpanded(!isExpanded)}
              kind="secondary"
              title={isExpanded ? 'Collapse' : 'Expand'}
              icon={<CollapsableStateIndicator isOpen={isExpanded} />}
            />
          </CollapseButtonWr>
        )}
      </Header>
      {isExpanded && isEnabled && (
        <Content>
          <Line />
          <RadioInput
            value={mode}
            onChange={setMode}
            options={focusAudioModes}
            renderOption={(option) => focusAduioModeName[option]}
          />
          <Match
            value={mode}
            youtube={() => <YouTubeFocusWidget />}
            sounds={() => <SoundsFocusWidget />}
          />
        </Content>
      )}
    </Container>
  )
}
