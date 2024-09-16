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
import { Switch } from '@lib/ui/inputs/Switch'
import {
  PersistentStateKey,
  usePersistentState,
} from '@increaser/ui/state/persistentState'
import { TabNavigation } from '@lib/ui/navigation/TabNavigation'
import { YouTubeViewSelector } from './youTube/YouTubeViewSelector'
import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { MoreHorizontalIcon } from '@lib/ui/icons/MoreHorizontalIcon'
import { Modal } from '@lib/ui/modal'
import { WithSecondaryAction } from '@lib/ui/buttons/WithSecondaryAction'
import styled, { css } from 'styled-components'
import { useIsFocusPaused } from '@increaser/ui/focus/utils/useIsFocusPaused'

const Container = styled(WithSecondaryAction)<{ isDisabled?: boolean }>`
  ${({ isDisabled }) =>
    isDisabled &&
    css`
      pointer-events: none;
      opacity: 0.5;
    `}
`

export const FocusAudioWidget = () => {
  const [isEnabled, setIsEnabled] = useIsFocusAudioEnabled()
  const [isExpanded, setIsExpanded] = usePersistentState<boolean>(
    PersistentStateKey.AreFocusSoundsCollapsed,
    false,
  )
  const [mode, setMode] = useFocusAudioMode()
  const isPaused = useIsFocusPaused()

  return (
    <>
      <Container isDisabled={isPaused}>
        <Switch
          label="Focus sounds"
          value={isEnabled}
          onChange={setIsEnabled}
          size="s"
        />
        {isEnabled && (
          <UnstyledButton
            onClick={() => {
              setIsExpanded(true)
            }}
            type="button"
            title="Change focus sounds"
          >
            <MoreHorizontalIcon />
          </UnstyledButton>
        )}
      </Container>
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
