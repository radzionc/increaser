import { HStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { PositionAbsolutelyCenterHorizontally } from '@lib/ui/layout/PositionAbsolutelyCenterHorizontally'
import { UiProps } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { range } from '@lib/utils/array/range'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { formatDailyEventTime } from '@lib/utils/time/formatDailyEventTime'
import { toPercents } from '@lib/utils/toPercents'
import styled from 'styled-components'

const dayTimeLabelsWidthInPx = 48
const dayTimeLabelTimeWidthInPx = 32

const Container = styled.div`
  position: relative;
  width: ${toSizeUnit(dayTimeLabelsWidthInPx)};
  height: 100%;
`

const MarkContainer = styled(HStack)`
  display: grid;
  align-items: center;
  grid-template-columns: ${toSizeUnit(dayTimeLabelTimeWidthInPx)} ${toSizeUnit(
      dayTimeLabelsWidthInPx - dayTimeLabelTimeWidthInPx,
    )};
  gap: 4px;
`

interface DayTimeLabelsProps extends UiProps {
  startHour: number
  endHour: number
}

export const DayTimeLabels = ({
  startHour,
  endHour,
  ...rest
}: DayTimeLabelsProps) => {
  const marksCount = endHour - startHour + 1

  return (
    <Container {...rest}>
      {range(marksCount).map((markIndex) => {
        const minutesSinceStart = markIndex * 60
        const minutes =
          minutesSinceStart + convertDuration(startHour, 'h', 'min')
        const top = toPercents(markIndex / (marksCount - 1))

        return (
          <PositionAbsolutelyCenterHorizontally
            key={markIndex}
            fullWidth
            top={top}
          >
            <MarkContainer>
              <Text size={12} color="supporting">
                {formatDailyEventTime(minutes)}
              </Text>
            </MarkContainer>
          </PositionAbsolutelyCenterHorizontally>
        )
      })}
    </Container>
  )
}
