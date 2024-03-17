import { useMemo } from 'react'
import React from 'react'
import { useTheme } from 'styled-components'
import { SvgArc } from './SvgArc'
import { sum } from '@lib/utils/array/sum'
import { ComponentWithValueProps } from '../../props'
import { PieChartItem } from './PieChartItem'

const totalDegrees = 360
const spaceBetweenInDegrees = 0.8

interface PieChartItemWithAngle extends PieChartItem {
  startAngle: number
  endAngle: number
}

const getItemsWithAngles = (items: PieChartItem[]): PieChartItemWithAngle[] => {
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

const svgViewBoxSize = 100

export const MinimalisticPieChart = ({
  value,
}: ComponentWithValueProps<PieChartItem[]>) => {
  const { colors } = useTheme()

  const itemsWithAngles = useMemo(() => {
    const result = getItemsWithAngles(value.filter((item) => item.value > 0))

    if (!result.length) {
      result.push({
        value: 1,
        color: colors.foreground,
        startAngle: 0,
        endAngle: totalDegrees,
      })
    }

    return result
  }, [colors.foreground, value])

  const radius = svgViewBoxSize / 2

  return (
    <svg viewBox={`0 0 ${svgViewBoxSize} ${svgViewBoxSize}`}>
      {itemsWithAngles.map(({ color, startAngle, endAngle, value }, index) => {
        if (value === 0) {
          return null
        }

        return (
          <SvgArc
            key={index}
            color={color}
            radius={radius}
            cutoutRadius={radius * 0.86}
            startAngle={startAngle}
            endAngle={endAngle - spaceBetweenInDegrees}
          />
        )
      })}
    </svg>
  )
}
