import { useIsFocusAudioEnabled } from './state/useIsFocusAudioEnabled'
import { Switch } from '@lib/ui/inputs/Switch'
import {
  PersistentStateKey,
  usePersistentState,
} from '@increaser/ui/state/persistentState'
import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { MoreHorizontalIcon } from '@lib/ui/icons/MoreHorizontalIcon'
import { WithSecondaryAction } from '@lib/ui/buttons/WithSecondaryAction'
import styled, { css } from 'styled-components'
import { useAssertFocusStatus } from '../state/focusIntervals'
import { FocusAudioOverlay } from './FocusAudioOverlay'

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
  const isPaused = useAssertFocusStatus() === 'paused'

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
            title="Change focus sounds"
          >
            <MoreHorizontalIcon />
          </UnstyledButton>
        )}
      </Container>
      {isExpanded && <FocusAudioOverlay onClose={() => setIsExpanded(false)} />}
    </>
  )
}
