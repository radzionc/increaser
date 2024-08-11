import { HSLA } from '@lib/ui/colors/HSLA'
import { useActiveItemIndex } from '@lib/ui/list/ActiveItemIndexProvider'
import { useCallback } from 'react'

export const useBarChartFillColor = (index: number) => {
  const [activeIndex] = useActiveItemIndex()

  const isActive = activeIndex === null || index === activeIndex

  return useCallback(
    (color: HSLA) => (isActive ? color : color.getVariant({ a: () => 0.16 })),
    [isActive],
  )
}
