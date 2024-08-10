import { ComponentWithIndexProps } from '@lib/ui/props'
import { useBarChartFillColor } from './hooks/useBarChartFillColor'
import { TakeWholeSpace } from '@lib/ui/css/takeWholeSpace'
import { HSLA } from '@lib/ui/colors/HSLA'

type Props = ComponentWithIndexProps & {
  color: HSLA
}

export const BarChartItemFill = ({ index, color }: Props) => {
  const getFillColor = useBarChartFillColor(index)

  return (
    <TakeWholeSpace
      style={{
        background: getFillColor(color).toCssValue(),
      }}
    />
  )
}
