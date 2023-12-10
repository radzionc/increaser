import styled, { useTheme } from 'styled-components'
import { useSetsExplorer } from './SetsExplorerProvider'
import { hourHeight } from './config'
import { range } from '@increaser/utils/array/range'
import { PositionAbsolutelyCenterHorizontally } from '@increaser/ui/layout/PositionAbsolutelyCenterHorizontally'
import { convertDuration } from '@increaser/utils/time/convertDuration'
import { Text } from '@increaser/ui/text'
import { formatDayTimeBoudnary } from '@increaser/entities-utils/user/formatDayTimeBoundary'
import { getColor } from '@increaser/ui/theme/getters'
import { dayMomentStepInMinutes, dayMoments } from '@increaser/entities/User'
import { useAssertUserState } from 'user/state/UserStateContext'
import { dayMomentIcon } from '../dayMomentIcon'
import { IconWrapper } from '@increaser/ui/icons/IconWrapper'
import { getDayMomentColor } from 'sets/utils/getDayMomentColor'

const Container = styled.div`
  position: relative;
`

const MarkContainer = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 32px 12px;
  gap: 4px;
`

const Mark = styled.div`
  height: 1px;
  background: ${getColor('textShy')};
  justify-self: end;
`

export const SetsExplorerTimeMarks = () => {
  const user = useAssertUserState()
  const { startHour, endHour } = useSetsExplorer()
  const height = (endHour - startHour) * hourHeight

  const marksCount =
    (endHour - startHour) /
      convertDuration(dayMomentStepInMinutes, 'min', 'h') +
    1

  const theme = useTheme()

  return (
    <Container style={{ height }}>
      {range(marksCount).map((markIndex) => {
        const minutesSinceStart = markIndex * dayMomentStepInMinutes
        const minutes =
          minutesSinceStart + convertDuration(startHour, 'h', 'min')
        const top = convertDuration(minutesSinceStart, 'min', 'h') * hourHeight
        const isPrimaryMark = minutes % 60 === 0
        const moment = dayMoments.find((moment) => user[moment] === minutes)

        const color = moment
          ? getDayMomentColor(moment, theme).toCssValue()
          : undefined

        return (
          <PositionAbsolutelyCenterHorizontally top={top}>
            <MarkContainer>
              {isPrimaryMark ? (
                <Text size={12} color="supporting" style={{ color }}>
                  {formatDayTimeBoudnary(minutes)}
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
