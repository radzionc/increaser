import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { getColor } from '@lib/ui/theme/getters'
import { range } from '@lib/utils/array/range'
import { toPercents } from '@lib/utils/toPercents'
import styled from 'styled-components'

import { dayOverviewConfig } from './config'
import { useDayOverview } from './DayOverviewProvider'

const leftPadding =
  dayOverviewConfig.horizontalPadding +
  dayOverviewConfig.timeLabelGap +
  dayOverviewConfig.dayTimeLabelsWidth

const Line = styled.div`
  position: absolute;
  left: ${toSizeUnit(leftPadding)};
  width: calc(
    100% - ${toSizeUnit(leftPadding + dayOverviewConfig.horizontalPadding)}
  );
  height: 1px;
  background: ${getColor('mist')};
`

export const HoursLines = () => {
  const { startHour, endHour } = useDayOverview()

  const linesCount = endHour + 1 - startHour

  return (
    <>
      {range(linesCount).map((index) => (
        <Line
          key={index}
          style={{
            top: toPercents(index / (linesCount - 1)),
          }}
        />
      ))}
    </>
  )
}
