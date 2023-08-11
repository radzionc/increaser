import styled from 'styled-components'
import { ComponentWithChildrenProps } from '../shared/props'

interface PositionAbsolutelyCenterHorizontallyProps
  extends ComponentWithChildrenProps {
  top: number
  fullWidth?: boolean
}

const Wrapper = styled.div`
  position: absolute;
  left: 0;
`

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

const Content = styled.div`
  position: absolute;
  left: 0;
`

export const PositionAbsolutelyCenterHorizontally = ({
  top,
  children,
  fullWidth,
}: PositionAbsolutelyCenterHorizontallyProps) => {
  return (
    <Wrapper style={{ top, width: fullWidth ? '100%' : undefined }}>
      <Container style={{ width: fullWidth ? '100%' : undefined }}>
        <Content style={{ width: fullWidth ? '100%' : undefined }}>
          {children}
        </Content>
      </Container>
    </Wrapper>
  )
}
