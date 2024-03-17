import { sum } from '@lib/utils/array/sum'
import { PieChartItem } from './PieChartItem'

interface PieChartItemWithAngle extends PieChartItem {
  startAngle: number
  endAngle: number
}

const totalDegrees = 360

export const getItemsWithAngles = (
  items: PieChartItem[],
): PieChartItemWithAngle[] => {
  const total = sum(items.map((item) => item.value))

  const itemsWithAngles: PieChartItemWithAngle[] = []

  items.forEach((item, index) => {
    const startAngle = index === 0 ? 0 : itemsWithAngles[index - 1].endAngle
    const endAngle = startAngle + (item.value / total) * totalDegrees

    itemsWithAngles.push({
      ...item,
      startAngle,
      endAngle,
    })
  })

  return itemsWithAngles
}
