import {
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  useClick,
  useDismiss,
} from '@floating-ui/react'
import { autoUpdate, offset, size } from '@floating-ui/dom'

import { useRef, useState } from 'react'
import { toSizeUnit } from '../css/toSizeUnit'

interface FloatingOptionsParams {
  selectedIndex: number
}

export const useFloatingOptions = ({
  selectedIndex,
}: FloatingOptionsParams) => {
  const [isOpen, setIsOpen] = useState(false)

  const { refs, context, floatingStyles } = useFloating({
    placement: 'bottom-end',
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(4),
      size({
        apply({ elements, availableHeight, rects }) {
          Object.assign(elements.floating.style, {
            maxHeight: `${toSizeUnit(Math.min(availableHeight, 320))}`,
            width: toSizeUnit(rects.reference.width),
          })
        },
      }),
    ],
  })

  const optionsRef = useRef<Array<HTMLElement | null>>([])
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [
      useClick(context, { event: 'mousedown' }),
      useRole(context, { role: 'listbox' }),
      useDismiss(context),
      useListNavigation(context, {
        listRef: optionsRef,
        activeIndex,
        selectedIndex,
        onNavigate: setActiveIndex,
        loop: true,
      }),
    ],
  )

  const setOptionRef = (index: number) => (element: HTMLElement | null) => {
    optionsRef.current[index] = element
  }

  return {
    isOpen,
    setIsOpen,
    getReferenceProps,
    setReferenceRef: refs.setReference,
    setFloatingRef: refs.setFloating,
    setOptionRef,
    getFloatingProps,
    getItemProps,
    activeIndex,
    floatingStyles,
  } as const
}
