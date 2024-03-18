import { ReactNode } from 'react'
import { PositionAbsolutelyCenterHorizontally } from '../layout/PositionAbsolutelyCenterHorizontally'
import { toPercents } from '@lib/utils/toPercents'
import { normalize } from '@lib/utils/math/normalize'

type ChartYAxisProps = {
  data: number[]
  renderLabel: (value: number) => ReactNode
  expectedLabelWidth: number
}

export const ChartYAxis = ({
  data,
  expectedLabelWidth,
  renderLabel,
}: ChartYAxisProps) => {
  return (
    <div
      style={{
        minWidth: expectedLabelWidth,
        position: 'relative',
      }}
    >
      {normalize(data).map((value, index) => {
        return (
          <PositionAbsolutelyCenterHorizontally
            top={toPercents(1 - value)}
            fullWidth
          >
            {renderLabel(data[index])}
          </PositionAbsolutelyCenterHorizontally>
        )
      })}
    </div>
  )
}
