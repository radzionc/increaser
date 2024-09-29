import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { HStack } from '@lib/ui/css/stack'
import { BodyPortal } from '@lib/ui/dom/BodyPortal'
import { Backdrop } from '@lib/ui/modal/Backdrop'
import { ModalCloseButton } from '@lib/ui/modal/ModalCloseButton'
import { ModalContainer } from '@lib/ui/modal/ModalContainer'
import { ModalContent } from '@lib/ui/modal/ModalContent'
import { ModalTitleText } from '@lib/ui/modal/ModalTitleText'
import { ClosableComponentProps } from '@lib/ui/props'
import styled from 'styled-components'
import { FocusAudioModeSelector } from './FocusAudioModeSelector'
import { Match } from '@lib/ui/base/Match'
import { SoundsFocusWidget } from './sounds/SoundsFocusWidget'
import { YouTubeFocusWidget } from './youTube/YouTubeFocusWidget'
import { useFocusAudioMode } from './state/useFocusAudioMode'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { modalConfig } from '@lib/ui/modal/config'

const Container = styled(ModalContainer)`
  > * {
    padding: ${toSizeUnit(modalConfig.padding)};
  }
`

const Content = styled(ModalContent)`
  ${horizontalPadding(0)};
  padding-top: 8px;
`

export const FocusAudioOverlay = ({ onClose }: ClosableComponentProps) => {
  const [mode] = useFocusAudioMode()

  return (
    <BodyPortal>
      <Backdrop onClose={onClose}>
        <Container width={480} placement="top">
          <HStack alignItems="start" justifyContent="space-between" gap={16}>
            <ModalTitleText>
              <FocusAudioModeSelector />
            </ModalTitleText>
            {onClose && <ModalCloseButton onClick={onClose} />}
          </HStack>
          <Content>
            <Match
              value={mode}
              youtube={() => <YouTubeFocusWidget />}
              sounds={() => <SoundsFocusWidget />}
            />
          </Content>
        </Container>
      </Backdrop>
    </BodyPortal>
  )
}
