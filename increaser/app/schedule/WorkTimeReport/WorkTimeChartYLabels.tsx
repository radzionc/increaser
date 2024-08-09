import styled, { useTheme } from 'styled-components'
import { range } from '@lib/utils/array/range'
import { PositionAbsolutelyCenterHorizontally } from '@lib/ui/layout/PositionAbsolutelyCenterHorizontally'
import { Text } from '@lib/ui/text'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { HStack } from '@lib/ui/layout/Stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { toPercents } from '@lib/utils/toPercents'
import { DayMoment, dayMomentStep } from '@increaser/entities/DayMoments'
import { formatDailyEventTime } from '@lib/utils/time/formatDailyEventTime'
import { UIComponentProps } from '@lib/ui/props'
import { getDayMomentColor } from '@increaser/ui/schedule/utils/getDayMomentColor'
import { dayMomentIcon } from '@increaser/ui/schedule/dayMomentIcon'
import { Interval } from '@lib/utils/interval/Interval'

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

type WorkTimeChartYLabels = UIComponentProps & Interval

const maxLabels = 16

const workTimeMoments: DayMoment[] = ['startWorkAt', 'finishWorkAt']

export const WorkTimeChartYLabels = ({
  start,
  end,
  ...rest
}: WorkTimeChartYLabels) => {
  const user = useAssertUserState()

  const marksCount = (end - start) / dayMomentStep + 1
  const markStep = Math.round(Math.ceil(marksCount / maxLabels) / 2) * 2
  const theme = useTheme()

  return (
    <Container {...rest}>
      {range(marksCount).map((markIndex) => {
        const minutesSinceStart = markIndex * dayMomentStep
        const minutes = minutesSinceStart + start
        const top = toPercents((marksCount - markIndex - 1) / (marksCount - 1))
        const hasNeighbourMoment = workTimeMoments.some(
          (moment) =>
            user[moment] === minutes + dayMomentStep ||
            user[moment] === minutes - dayMomentStep,
        )
        const isPrimaryMark = !hasNeighbourMoment && markIndex % markStep === 0

        const moment = workTimeMoments.find(
          (moment) => user[moment] === minutes,
        )

        const color = moment
          ? getDayMomentColor(moment, theme).toCssValue()
          : undefined

        return (
          <PositionAbsolutelyCenterHorizontally
            key={markIndex}
            fullWidth
            top={top}
          >
            <MarkContainer>
              {isPrimaryMark || moment ? (
                <Text size={12} color={moment ? 'contrast' : 'shy'}>
                  {formatDailyEventTime(minutes)}
                </Text>
              ) : (
                <div />
              )}
              {moment && (
                <IconWrapper style={{ color, fontSize: 14 }}>
                  {dayMomentIcon[moment]}
                </IconWrapper>
              )}
            </MarkContainer>
          </PositionAbsolutelyCenterHorizontally>
        )
      })}
    </Container>
  )
}
