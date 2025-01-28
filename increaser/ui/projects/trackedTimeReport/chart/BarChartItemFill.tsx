import { ColorProp, IndexProp } from '@lib/ui/props'
import { useBarChartFillColor } from './hooks/useBarChartFillColor'
import { TakeWholeSpace } from '@lib/ui/css/takeWholeSpace'

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
