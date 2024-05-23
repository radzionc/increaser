import { useFocusAudioMode } from './state/useFocusAudioMode'
import { FocusAudioModeSelector } from './FocusAudioModeSelector'
import { Match } from '@lib/ui/base/Match'
import { YouTubeFocusWidget } from './youTube/YouTubeFocusWidget'
import { SoundsFocusWidget } from './sounds/SoundsFocusWidget'
import { useIsFocusAudioEnabled } from './state/useIsFocusAudioEnabled'
import { Panel } from '@lib/ui/panel/Panel'
import { VStack } from '@lib/ui/layout/Stack'
import styled from 'styled-components'

const Content = styled(Panel)`
  flex: 1;
`

export const FocusAudioWidget = () => {
  const [isEnabled] = useIsFocusAudioEnabled()
  const [mode] = useFocusAudioMode()

  return (
    <VStack style={{ flex: 1 }} gap={8}>
      <FocusAudioModeSelector />
      {isEnabled && (
        <Content withSections kind="secondary">
          <Match
            value={mode}
            youtube={() => <YouTubeFocusWidget />}
            sounds={() => <SoundsFocusWidget />}
          />
        </Content>
      )}
    </VStack>
  )
}
