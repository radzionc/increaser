import {
  offset,
  shift,
  flip,
  useFloating,
  autoUpdate,
} from '@floating-ui/react'
import { useEffect } from 'react'
import { ChildrenProp, PositionProp } from '@lib/ui/props'
import { FixedReference } from '@lib/ui/base/FixedReference'

export const PositionFocusTimeBreakdown = ({
  position,
  children,
}: ChildrenProp & PositionProp) => {
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
      <FixedReference
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
