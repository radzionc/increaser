import {
  focusAduioModeName,
  FocusAudioMode,
  focusAudioModes,
  useFocusAudioMode,
} from './state/useFocusAudioMode'
import { Match } from '@lib/ui/base/Match'
import { YouTubeFocusWidget } from './youTube/YouTubeFocusWidget'
import { SoundsFocusWidget } from './sounds/SoundsFocusWidget'
import { useIsFocusAudioEnabled } from './state/useIsFocusAudioEnabled'
import { HStack, VStack } from '@lib/ui/css/stack'
import styled from 'styled-components'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { getColor } from '@lib/ui/theme/getters'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { Switch } from '@lib/ui/inputs/Switch'
import { centerContent } from '@lib/ui/css/centerContent'
import {
  PersistentStateKey,
  usePersistentState,
} from '@increaser/ui/state/persistentState'
import { TabNavigation } from '@lib/ui/navigation/TabNavigation'
import { YouTubeViewSelector } from './youTube/YouTubeViewSelector'
import { interactive } from '@lib/ui/css/interactive'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { getHoverVariant } from '@lib/ui/theme/getHoverVariant'
import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { MoreHorizontalIcon } from '@lib/ui/icons/MoreHorizontalIcon'
import { Modal } from '@lib/ui/modal'

const height = 40

const Wrapper = styled(HStack)`
  ${interactive};
  height: ${toSizeUnit(height)};
  border: 1px solid ${getColor('mistExtra')};
  ${borderRadius.m};
  overflow: hidden;

  > * {
    &:first-child {
      border-right: 1px solid ${getColor('mistExtra')};
    }
    background: ${getColor('foreground')};
  }
`

const Content = styled(Switch)`
  height: 100%;
  ${horizontalPadding(12)};
  &:hover {
    background: ${getHoverVariant('foreground')};
    color: ${getColor('contrast')};
  }
`

const MoreButton = styled(UnstyledButton)`
  ${sameDimensions(height)};
  color: ${getColor('textSupporting')};

  outline: none;

  ${centerContent};

  &:hover {
    background: ${getHoverVariant('foreground')};
    color: ${getColor('contrast')};
  }
`
export const FocusAudioWidget = () => {
  const [isEnabled, setIsEnabled] = useIsFocusAudioEnabled()
  const [isExpanded, setIsExpanded] = usePersistentState<boolean>(
    PersistentStateKey.AreFocusSoundsCollapsed,
    false,
  )
  const [mode, setMode] = useFocusAudioMode()

  return (
    <>
      <Wrapper>
        <Content
          label="Focus sounds"
          value={isEnabled}
          onChange={setIsEnabled}
          size="s"
        />
        {isEnabled && (
          <MoreButton
            onClick={() => {
              setIsExpanded(true)
            }}
            type="button"
            title="Change focus sounds"
          >
            <MoreHorizontalIcon />
          </MoreButton>
        )}
      </Wrapper>
      {isExpanded && (
        <Modal
          width={560}
          title="Focus sounds"
          onClose={() => setIsExpanded(false)}
          placement="top"
        >
          <VStack gap={20}>
            <HStack
              fullWidth
              alignItems="center"
              wrap="wrap"
              gap={20}
              justifyContent="space-between"
            >
              <TabNavigation<FocusAudioMode>
                views={focusAudioModes}
                getViewName={(option) => focusAduioModeName[option]}
                activeView={mode}
                onSelect={setMode}
              />
              {mode === 'youtube' && <YouTubeViewSelector />}
            </HStack>
            <Match
              value={mode}
              youtube={() => <YouTubeFocusWidget />}
              sounds={() => <SoundsFocusWidget />}
            />
          </VStack>
        </Modal>
      )}
    </>
  )
}
