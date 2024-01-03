import styled, { useTheme } from 'styled-components'
import { range } from '@lib/utils/array/range'
import { PositionAbsolutelyCenterHorizontally } from '@lib/ui/layout/PositionAbsolutelyCenterHorizontally'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { Text } from '@lib/ui/text'
import { getColor } from '@lib/ui/theme/getters'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { getDayMomentColor } from '@increaser/app/sets/utils/getDayMomentColor'
import { HStack } from '@lib/ui/layout/Stack'
import { dayMomentIcon } from './dayMomentIcon'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { toPercents } from '@lib/utils/toPercents'
import { dayMomentStep, dayMoments } from '@increaser/entities/DayMoments'
import { formatDailyEventTime } from '@lib/utils/time/formatDailyEventTime'
import { UIComponentProps } from '@lib/ui/props'

export const dayTimeLabelsWidthInPx = 48
export const dayTimeLabelTimeWidthInPx = 32

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

const Mark = styled.div`
  height: 1px;
  background: ${getColor('textShy')};
  justify-self: end;
`

interface DayTimeLabelsProps extends UIComponentProps {
  startHour: number
  endHour: number
}

export const DayTimeLabels = ({
  startHour,
  endHour,
  ...rest
}: DayTimeLabelsProps) => {
  const user = useAssertUserState()

  const marksCount =
    (endHour - startHour) / convertDuration(dayMomentStep, 'min', 'h') + 1

  const theme = useTheme()

  return (
    <Container {...rest}>
      {range(marksCount).map((markIndex) => {
        const minutesSinceStart = markIndex * dayMomentStep
        const minutes =
          minutesSinceStart + convertDuration(startHour, 'h', 'min')
        const top = toPercents(markIndex / (marksCount - 1))
        const isPrimaryMark = minutes % 60 === 0
        const moment = dayMoments.find((moment) => user[moment] === minutes)

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
              {isPrimaryMark ? (
                <Text size={12} color="supporting">
                  {formatDailyEventTime(minutes)}
                </Text>
              ) : moment ? (
                <Mark
                  style={{
                    width: isPrimaryMark ? '100%' : '32%',
                    background: color,
                  }}
                />
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
