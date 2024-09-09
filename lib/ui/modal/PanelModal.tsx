import { ComponentWithChildrenProps, NoValueFinishProps } from '@lib/ui/props'
import { BodyPortal } from '@lib/ui/dom/BodyPortal'
import { CompleteMist } from '@lib/ui/modal/CompleteMist'
import { FocusTrap } from '@lib/ui/modal/FocusTrap'
import styled from 'styled-components'
import { ModalContainer } from '@lib/ui/modal/ModalContainer'
import { stopPropagation } from '@lib/ui/utils/stopPropagation'

const Container = styled(ModalContainer)`
  > * {
    border-radius: 0;
    border: none;
  }
`

type PanelModalProps = NoValueFinishProps &
  ComponentWithChildrenProps & {
    width?: number
  }

export const PanelModal = ({
  onFinish,
  children,
  width = 560,
}: PanelModalProps) => {
  return (
    <BodyPortal>
      <CompleteMist onClick={() => onFinish()}>
        <FocusTrap>
          <Container
            onClick={stopPropagation()}
            placement="top"
            targetWidth={width}
          >
            {children}
          </Container>
        </FocusTrap>
      </CompleteMist>
    </BodyPortal>
  )
}
