import React, { useRef } from 'react'
import styled from 'styled-components'
import { takeWholeSpace } from '../css/takeWholeSpace'
import { centerContent } from '../css/centerContent'
import { getColor } from '../theme/getters'
import { ClickableComponentProps, ComponentWithChildrenProps } from '../props'

const Container = styled.div`
  z-index: 1;
  position: fixed;
  left: 0;
  top: 0;
  ${takeWholeSpace};
  ${centerContent};
  background: ${getColor('overlay')};
  backdrop-filter: blur(4px);
`

export const CompleteMist = ({
  onClick,
  children,
}: Partial<ClickableComponentProps> & ComponentWithChildrenProps) => {
  const isPointerDownInside = useRef(false)

  return (
    <Container
      onPointerDown={({ target, currentTarget }) => {
        if (target === currentTarget) {
          isPointerDownInside.current = true
        }
      }}
      onPointerUp={() => {
        if (isPointerDownInside.current) {
          onClick?.()
        }
        isPointerDownInside.current = false
      }}
      onPointerCancel={() => {
        isPointerDownInside.current = false
      }}
    >
      {children}
    </Container>
  )
}
