import { Text } from '@increaser/ui/text'
import { formatDuration } from '@increaser/utils/time/formatDuration'
import styled from 'styled-components'
import { useDayOverview } from './DayOverviewProvider'
import { useStartOfDay } from '@increaser/ui/hooks/useStartOfDay'

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
  const { workdayEndsAt, timelineEndsAt, currentTime, dayStartedAt } =
    useDayOverview()
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
