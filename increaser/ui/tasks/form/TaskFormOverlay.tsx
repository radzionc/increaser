import {
  ComponentWithChildrenProps,
  FinishableComponentProps,
} from '@lib/ui/props'
import { useIsScreenWidthLessThan } from '@lib/ui/hooks/useIsScreenWidthLessThan'
import { modalConfig } from '@lib/ui/modal/config'
import { BodyPortal } from '@lib/ui/dom/BodyPortal'
import { CompleteMist } from '@lib/ui/modal/CompleteMist'
import { FocusTrap } from '@lib/ui/modal/FocusTrap'
import styled from 'styled-components'
import { ModalContainer } from '@lib/ui/modal/ModalContainer'
import { stopPropagation } from '@lib/ui/utils/stopPropagation'
import { getColor } from '@lib/ui/theme/getters'

const prefferedWidth = 560

const Container = styled(ModalContainer)`
  overflow: hidden;
  border: 2px solid ${getColor('mist')};
`

export const TaskFormOverlay = ({
  onFinish,
  children,
}: FinishableComponentProps & ComponentWithChildrenProps) => {
  const isFullScreen = useIsScreenWidthLessThan(
    prefferedWidth + modalConfig.minHorizontalFreeSpaceForMist,
  )

  return (
    <BodyPortal>
      <CompleteMist onClick={onFinish}>
        <FocusTrap>
          <Container
            onClick={stopPropagation()}
            placement="top"
            width={isFullScreen ? undefined : prefferedWidth}
          >
            {children}
          </Container>
        </FocusTrap>
      </CompleteMist>
    </BodyPortal>
  )
}
