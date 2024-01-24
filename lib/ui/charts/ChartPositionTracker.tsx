import styled from 'styled-components'
import { takeWholeSpace } from '../css/takeWholeSpace'
import { HoverTracker } from '../base/HoverTracker'
import { HSLA } from '../colors/HSLA'
import { LineChartPosition } from './LineChartPosition'

type ChartPositionTrackerProps = {
  data: number[]
  color: HSLA
  onChange?: (index: number | null) => void
}

const Container = styled.div`
  position: absolute;
  ${takeWholeSpace};
  top: 0;
  left: 0;
`

export const ChartPositionTracker = ({
  onChange,
  data,
  color,
}: ChartPositionTrackerProps) => {
  return (
    <HoverTracker
      onChange={({ position }) => {
        onChange?.(position ? Math.round(position.x * (data.length - 1)) : null)
      }}
      render={({ props, position }) => {
        return (
          <>
            <Container {...props} />
            {position && (
              <LineChartPosition data={data} color={color} value={position} />
            )}
          </>
        )
      }}
    />
  )
}
