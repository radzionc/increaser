import {
  offset,
  shift,
  flip,
  useFloating,
  autoUpdate,
} from '@floating-ui/react'
import styled from 'styled-components'
import { useEffect } from 'react'
import {
  ComponentWithChildrenProps,
  PositionedComponentProps,
} from '@lib/ui/props'

const Reference = styled.div`
  position: fixed;
  pointer-events: none;
`

export const PositionFocusTimeBreakdown = ({
  position,
  children,
}: ComponentWithChildrenProps & PositionedComponentProps) => {
  const {
    refs: { setReference, setFloating },
    floatingStyles,
    update,
  } = useFloating({
    open: true,
    placement: 'bottom',
    strategy: 'fixed',
    middleware: [offset(20), flip(), shift()],
    whileElementsMounted: autoUpdate,
  })

  useEffect(() => {
    update()
  }, [position, update])

  return (
    <>
      <Reference
        ref={setReference}
        style={{
          left: position.x,
          top: position.y,
        }}
      />
      <div ref={setFloating} style={{ ...floatingStyles, zIndex: 1 }}>
        {children}
      </div>
    </>
  )
}
