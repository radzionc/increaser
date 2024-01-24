import styled from 'styled-components'
import { HSLA } from '../colors/HSLA'
import { Point } from '../entities/Point'
import { getColor } from '../theme/getters'
import { sameDimensions } from '../css/sameDimensions'
import { round } from '../css/round'
import { toPercents } from '@lib/utils/toPercents'
import { toSizeUnit } from '../css/toSizeUnit'
import { PositionAbsolutelyCenterVertically } from '../layout/PositionAbsolutelyCenterVertically'

type ChartPositionProps = {
  data: number[]
  color: HSLA
  value: Point
}

const size = 12
const lineWidth = 2

const Container = styled.div`
  position: absolute;
  ${round};
  border: 2px solid ${getColor('contrast')};
  ${sameDimensions(size)};
`

const Line = styled.div`
  height: 100%;
  border-left: ${toSizeUnit(lineWidth)} dashed;
  color: ${getColor('textShy')};
`

export const ChartPosition = ({ data, color, value }: ChartPositionProps) => {
  const width = data.length - 1
  const index = Math.round(value.x * width)
  const x = index / width
  const y = data[index]

  return (
    <>
      <PositionAbsolutelyCenterVertically
        style={{
          pointerEvents: 'none',
        }}
        fullHeight
        left={toPercents(x)}
      >
        <Line />
      </PositionAbsolutelyCenterVertically>
      <Container
        style={{
          pointerEvents: 'none',
          left: `calc(${toPercents(x)} - ${toSizeUnit(size / 2)})`,
          bottom: `calc(${toPercents(y)} - ${toSizeUnit(size / 2)})`,
          background: color.toCssValue(),
        }}
      />
    </>
  )
}
