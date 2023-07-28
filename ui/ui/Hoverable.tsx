import styled from 'styled-components'

import { defaultTransitionCSS } from './animations/transitions'
import { getCSSUnit } from './utils/getCSSUnit'
import { getColor } from './theme/getters'
import { ComponentProps } from 'react'
import { UnstyledButton } from './buttons/UnstyledButton'

const Highlight = styled.div`
  position: absolute;
  ${defaultTransitionCSS};
  border-radius: 8px;
`

const Container = styled(UnstyledButton)`
  position: relative;

  :hover ${Highlight} {
    background: ${getColor('mist')};
  }
`

const Content = styled.div`
  z-index: 1;
`

interface HoverableProps extends ComponentProps<typeof Container> {
  horizontalOffset?: number
  verticalOffset?: number
  onClick?: () => void
  style?: React.CSSProperties
}

export const Hoverable = ({
  children,
  horizontalOffset = 8,
  verticalOffset = 8,
  onClick,
  as,
  style,
}: HoverableProps) => {
  return (
    <Container onClick={onClick} as={as} style={style}>
      <Highlight
        style={{
          left: getCSSUnit(-horizontalOffset),
          top: getCSSUnit(-verticalOffset),
          width: `calc(100% + ${getCSSUnit(horizontalOffset * 2)})`,
          height: `calc(100% + ${getCSSUnit(verticalOffset * 2)})`,
        }}
      />
      <Content>{children}</Content>
    </Container>
  )
}
