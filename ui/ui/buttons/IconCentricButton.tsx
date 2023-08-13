import { ReactNode } from 'react'
import styled from 'styled-components'

import { Button, ButtonProps } from './Button'
import { centerContentCSS } from '../utils/centerContentCSS'
import { getHorizontalPaddingCSS } from '../utils/getHorizontalPaddingCSS'

const Content = styled.div`
  position: relative;
  width: 100%;
  ${centerContentCSS};
`

const IconWrapper = styled.div`
  position: absolute;
  left: 0;
  font-size: 18px;
  display: flex;
`

interface Props extends Omit<ButtonProps, 'children'> {
  icon: ReactNode
  text: ReactNode
}

const Container = styled(Button)`
  ${getHorizontalPaddingCSS(20)};
`

export const IconCentricButton = ({ icon, text, as, ...rest }: Props) => (
  <Container kind="outlined" forwardedAs={as} size="xl" {...rest}>
    <Content>
      <IconWrapper>{icon}</IconWrapper>
      {text}
    </Content>
  </Container>
)
