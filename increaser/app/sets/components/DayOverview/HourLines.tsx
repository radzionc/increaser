import { range } from '@lib/utils/array/range'
import { useDayOverview } from './DayOverviewProvider'
import styled from 'styled-components'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { dayTimeLabelsWidthInPx } from '../DayTimeLabels'
import { getColor } from '@lib/ui/theme/getters'
import { toPercents } from '@lib/utils/toPercents'
import { dayOverviewConfig } from './config'

const leftPadding =
  dayOverviewConfig.horizontalPadding +
  dayOverviewConfig.timeLabelGap +
  dayTimeLabelsWidthInPx

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
