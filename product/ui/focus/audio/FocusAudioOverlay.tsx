import { Match } from '@lib/ui/base/Match'
import { hStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { BodyPortal } from '@lib/ui/dom/BodyPortal'
import { Backdrop } from '@lib/ui/modal/Backdrop'
import { modalConfig } from '@lib/ui/modal/config'
import { ModalCloseButton } from '@lib/ui/modal/ModalCloseButton'
import { ModalContainer } from '@lib/ui/modal/ModalContainer'
import { ModalTitleText } from '@lib/ui/modal/ModalTitleText'
import { OnCloseProp } from '@lib/ui/props'
import styled from 'styled-components'

import { focusAudioConfig } from './config'
import { FocusAudioModeSelector } from './FocusAudioModeSelector'
import { SoundsFocusWidget } from './sounds/SoundsFocusWidget'
import { useFocusAudioMode } from './state/useFocusAudioMode'
import { YouTubeFocusWidget } from './youTube/YouTubeFocusWidget'

const Header = styled.div`
  ${hStack({
    justifyContent: 'space-between',
    alignItems: 'start',
    gap: 16,
  })}
  padding: ${toSizeUnit(modalConfig.padding)};
`

export const FocusAudioOverlay = ({ onClose }: OnCloseProp) => {
  const [mode] = useFocusAudioMode()

  return (
    <BodyPortal>
      <Backdrop onClose={onClose}>
        <ModalContainer width={focusAudioConfig.modalWidth} placement="top">
          <Header>
            <ModalTitleText>
              <FocusAudioModeSelector />
            </ModalTitleText>
            {onClose && <ModalCloseButton onClick={onClose} />}
          </Header>
          <Match
            value={mode}
            youtube={() => <YouTubeFocusWidget />}
            sounds={() => <SoundsFocusWidget />}
          />
        </ModalContainer>
      </Backdrop>
    </BodyPortal>
  )
}
