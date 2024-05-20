import styled, { css } from 'styled-components'
import { useFocusAudioMode } from './state/useFocusAudioMode'
import { Panel } from '@lib/ui/panel/Panel'
import { transition } from '@lib/ui/css/transition'
import { FocusAudioModeSelector } from './FocusAudioModeSelector'
import { Match } from '@lib/ui/base/Match'
import { YouTubeFocusWidget } from './youTube/YouTubeFocusWidget'
import { SoundsFocusWidget } from './sounds/SoundsFocusWidget'

const Container = styled(Panel)<{ isActive: boolean }>`
  ${transition};
  background: transparent;
  width: 100%;

  ${({ isActive }) =>
    !isActive &&
    css`
      box-shadow: none;
      border-color: transparent;

      > * {
        background: transparent;
      }
    `}
`

export const FocusAudioWidget = () => {
  const [mode] = useFocusAudioMode()

  return (
    <Container
      padding={16}
      kind="secondary"
      withSections
      isActive={mode !== 'none'}
    >
      <FocusAudioModeSelector />
      <Match
        value={mode}
        none={() => null}
        youtube={() => <YouTubeFocusWidget />}
        sounds={() => <SoundsFocusWidget />}
      />
    </Container>
  )
}
