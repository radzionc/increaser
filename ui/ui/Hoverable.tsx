import styled from 'styled-components'

import { getCSSUnit } from './utils/getCSSUnit'
import { getColor } from './theme/getters'
import { ComponentProps } from 'react'
import { UnstyledButton } from './buttons/UnstyledButton'
import { transition } from '../css/transition'
import { UIComponentProps } from '../props'

const Highlight = styled.div`
  position: absolute;
  ${transition};
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

interface HoverableProps
  extends ComponentProps<typeof Container>,
    UIComponentProps {
  horizontalOffset?: number
  verticalOffset?: number
  onClick?: () => void
}

export const Hoverable = ({
  children,
  horizontalOffset = 8,
  verticalOffset = 8,
  onClick,
  as,
  style,
  className,
}: HoverableProps) => {
  return (
    <Container
      type="button"
      onClick={onClick}
      as={as}
      style={style}
      className={className}
    >
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
