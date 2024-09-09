import { ComponentProps, ReactNode } from 'react'
import { AsElementComponent, TitledComponentProps } from '../props'
import { BodyPortal } from '../dom/BodyPortal'
import { CompleteMist } from './CompleteMist'
import { useKey } from 'react-use'
import { FocusTrap } from './FocusTrap'
import { ModalContainer, ModalPlacement } from './ModalContainer'
import { HStack, VStack } from '@lib/ui/css/stack'
import { ModalTitleText } from './ModalTitleText'
import { ModalContent } from './ModalContent'
import { ModalCloseButton } from './ModalCloseButton'
import { ModalSubTitleText } from './ModalSubTitleText'
import styled from 'styled-components'

export type ModalProps = TitledComponentProps &
  AsElementComponent &
  ComponentProps<typeof Container> & {
    onClose?: () => void
    subTitle?: ReactNode
    placement?: ModalPlacement
    footer?: ReactNode
    targetWidth?: number
  }

const Container = styled(ModalContainer)`
  > * {
    padding: 24px;
  }
`

export const Modal = ({
  title,
  children,
  onClose,
  footer,
  subTitle,
  as,
  ...rest
}: ModalProps) => {
  useKey('Escape', onClose)

  return (
    <BodyPortal>
      <CompleteMist onClick={onClose}>
        <FocusTrap>
          <Container forwardedAs={as} {...rest}>
            <VStack gap={8}>
              <HStack
                alignItems="start"
                justifyContent="space-between"
                gap={16}
              >
                <ModalTitleText>{title}</ModalTitleText>
                {onClose && <ModalCloseButton onClick={onClose} />}
              </HStack>
              {subTitle && <ModalSubTitleText>{subTitle}</ModalSubTitleText>}
            </VStack>
            <ModalContent>{children}</ModalContent>
            {footer && <VStack>{footer}</VStack>}
          </Container>
        </FocusTrap>
      </CompleteMist>
    </BodyPortal>
  )
}
