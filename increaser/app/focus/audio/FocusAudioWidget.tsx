import styled from 'styled-components'
import { useFocusAudioMode } from './state/useFocusAudioMode'
import { Panel } from '@lib/ui/panel/Panel'
import { transition } from '@lib/ui/css/transition'
import { FocusAudioModeSelector } from './FocusAudioModeSelector'
import { Match } from '@lib/ui/base/Match'
import { YouTubeFocusWidget } from './youTube/YouTubeFocusWidget'
import { SoundsFocusWidget } from './sounds/SoundsFocusWidget'
import { VStack } from '@lib/ui/layout/Stack'
import { useIsFocusAudioEnabled } from './state/useIsFocusAudioEnabled'

const Container = styled(Panel)`
  ${transition};
  background: transparent;
  width: 100%;
`

export const FocusAudioWidget = () => {
  const [isEnabled] = useIsFocusAudioEnabled()
  const [mode] = useFocusAudioMode()

  return (
    <VStack gap={8}>
      <FocusAudioModeSelector />
      {isEnabled && (
        <Container kind="secondary" withSections>
          <Match
            value={mode}
            youtube={() => <YouTubeFocusWidget />}
            sounds={() => <SoundsFocusWidget />}
          />
        </Container>
      )}
    </VStack>
  )
}
