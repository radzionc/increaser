import { ReactNode } from 'react'
import {
  ClosableComponentProps,
  ComponentWithChildrenProps,
  TitledComponentProps,
} from '../props'
import { BodyPortal } from '../ui/BodyPortal'
import { CompleteMist } from './CompleteMist'
import { useIsScreenWidthLessThan } from '../hooks/useIsScreenWidthLessThan'
import { useKey } from 'react-use'
import { FocusTrap } from './FocusTrap'
import { ModalContainer, ModalPlacement } from './ModalContainer'
import { HStack, VStack } from '../ui/Stack'
import { ModalTitleText } from './ModalTitleText'
import { ModalContent } from './ModalContent'
import { ModalCloseButton } from './ModalCloseButton'
import { stopPropagation } from '../utils/stopPropagation'
import { preventDefault } from '../utils/preventDefault'

type ModalProps = TitledComponentProps &
  ComponentWithChildrenProps &
  ClosableComponentProps & {
    placement?: ModalPlacement
    footer?: ReactNode
    width?: number
    onSubmit?: () => void
  }

const minHorizontalFreeSpaceForMist = 120

export const Modal = ({
  title,
  children,
  onClose,
  placement = 'center',
  footer,
  width = 400,
  onSubmit,
}: ModalProps) => {
  const isFullScreen = useIsScreenWidthLessThan(
    width + minHorizontalFreeSpaceForMist,
  )

  useKey('Escape', onClose)

  return (
    <BodyPortal>
      <CompleteMist onClick={onClose}>
        <FocusTrap>
          <ModalContainer
            onClick={stopPropagation()}
            as={onSubmit ? 'form' : 'div'}
            onSubmit={preventDefault(onSubmit)}
            placement={placement}
            width={isFullScreen ? undefined : width}
          >
            <HStack alignItems="start" justifyContent="space-between">
              <ModalTitleText>{title}</ModalTitleText>
              <ModalCloseButton onClick={onClose} />
            </HStack>
            <ModalContent>{children}</ModalContent>
            <VStack>{footer}</VStack>
          </ModalContainer>
        </FocusTrap>
      </CompleteMist>
    </BodyPortal>
  )
}
