import { useTheme } from 'styled-components'
import { useSetsExplorer } from './SetsExplorerProvider'
import { dayWith, daysGap } from './config'
import { getSetsSum } from 'sets/helpers/getSetsSum'

export const SetsExplorerDaysChart = () => {
  const { days } = useSetsExplorer()
  const svgWidth = days.length * dayWith + (days.length - 1) * daysGap
  const svgHeight = 100
  const data = days.map((day) => getSetsSum(day.sets))
  console.log('data: ', data)

  const theme = useTheme()

  const maxValue = Math.max(...data)

  // Function to scale Y values
  const scaleY = (value: number) => svgHeight - (value / maxValue) * svgHeight

  // Function to scale X values
  const scaleX = (index: number) => index * (dayWith + daysGap)

  // Create path data
  let pathData = `M ${scaleX(0)} ${scaleY(data[0])}`
  data.forEach((value, index) => {
    if (index > 0) {
      pathData += ` L ${scaleX(index)} ${scaleY(value)}`
    }
  })

  return (
    <svg style={{ minWidth: svgWidth }} width={svgWidth} height={svgHeight}>
      <path
        d={pathData}
        fill="none"
        stroke={theme.colors.primary.toCssValue()}
      />
    </svg>
  )
}
