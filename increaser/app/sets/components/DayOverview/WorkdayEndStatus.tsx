import { Text } from '@lib/ui/text'
import { formatDuration } from '@lib/utils/time/formatDuration'
import styled from 'styled-components'
import { useDayOverview } from './DayOverviewProvider'
import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useAssertUserState } from '@increaser/app/user/state/UserStateContext'

const Container = styled.div`
  position: absolute;
  bottom: -20px;
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 14px;
  line-height: 1;
`

export const WorkdayEndStatus = () => {
  const { finishWorkAt } = useAssertUserState()
  const { endHour, currentTime, dayStartedAt } = useDayOverview()
  const timelineEndsAt = dayStartedAt + convertDuration(endHour, 'h', 'ms')
  const workdayEndsAt =
    dayStartedAt + convertDuration(finishWorkAt, 'min', 'ms')
  const workEndsIn = workdayEndsAt - currentTime

  const todayStartedAt = useStartOfDay()
  if (dayStartedAt !== todayStartedAt) {
    return null
  }

  if (timelineEndsAt > workdayEndsAt) {
    return null
  }

  return (
    <Container>
      {currentTime < workdayEndsAt && (
        <Text color="contrast" weight="semibold" size={14}>
          <Text as="span" color="supporting">
            workday ends in
          </Text>{' '}
          {formatDuration(workEndsIn, 'ms')}
        </Text>
      )}
    </Container>
  )
}
