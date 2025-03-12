import { borderRadius } from '@lib/ui/css/borderRadius'
import { RectangleCorner } from '@lib/ui/entities/RectangleCorner'
import { ChildrenProp } from '@lib/ui/props'
import { getHoverVariant } from '@lib/ui/theme/getHoverVariant'
import { match } from '@lib/utils/match'
import { CSSProperties } from 'react'
import styled from 'styled-components'

import { useFloatingWidgetPosition } from './state/floatingWidgetPosition'

const offset = 20

const Wrapper = styled.div`
  position: fixed;
  width: 320px;
  z-index: 2;
  ${borderRadius.m};
  overflow: hidden;
  border: 2px solid ${getHoverVariant('foreground')};
`

export const FloatingWidgetContainer = ({ children }: ChildrenProp) => {
  const [position] = useFloatingWidgetPosition()

  return (
    <Wrapper
      style={match<RectangleCorner, CSSProperties>(position, {
        'bottom-left': () => ({ bottom: offset, left: offset }),
        'bottom-right': () => ({ bottom: offset, right: offset }),
        'top-left': () => ({ top: offset, left: offset }),
        'top-right': () => ({ top: offset, right: offset }),
      })}
    >
      {children}
    </Wrapper>
  )
}
