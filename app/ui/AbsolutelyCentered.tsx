import { ComponentWithChildrenProps } from 'shared/props'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: absolute;
  left: 0;
`

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

interface AbsolutelyCenteredProps extends ComponentWithChildrenProps {
  top?: React.CSSProperties['top']
}

export const AbsolutelyCentered = ({
  children,
  top,
}: AbsolutelyCenteredProps) => {
  return (
    <Wrapper style={{ top }}>
      <Container>{children}</Container>
    </Wrapper>
  )
}
