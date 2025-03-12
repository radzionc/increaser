import { TakeWholeSpace } from '@lib/ui/css/takeWholeSpace'
import { ColorProp, IndexProp } from '@lib/ui/props'

import { useBarChartFillColor } from './hooks/useBarChartFillColor'

export const BarChartItemFill = ({ index, color }: IndexProp & ColorProp) => {
  const getFillColor = useBarChartFillColor(index)

  return (
    <TakeWholeSpace
      style={{
        background: getFillColor(color).toCssValue(),
      }}
    />
  )
}
