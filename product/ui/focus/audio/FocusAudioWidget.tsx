import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { WithSecondaryAction } from '@lib/ui/buttons/WithSecondaryAction'
import { MoreHorizontalIcon } from '@lib/ui/icons/MoreHorizontalIcon'
import { Switch } from '@lib/ui/inputs/Switch'
import {
  PersistentStateKey,
  usePersistentState,
} from '@product/ui/state/persistentState'
import styled, { css } from 'styled-components'

import { useAssertFocusStatus } from '../state/focusIntervals'

import { FocusAudioOverlay } from './FocusAudioOverlay'
import { useIsFocusAudioEnabled } from './state/useIsFocusAudioEnabled'

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
