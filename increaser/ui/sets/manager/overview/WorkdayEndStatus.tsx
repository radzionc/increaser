import { Text } from '@lib/ui/text'
import { formatDuration } from '@lib/utils/time/formatDuration'
import styled from 'styled-components'
import { useDayOverview } from './DayOverviewProvider'
import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useSelectedWeekday } from '@lib/ui/time/SelectedWeekdayProvider'
import { useStartOfWeekday } from '@lib/ui/time/hooks/useStartOfWeekday'
import { useWorkDayEndsAt } from '../../../schedule/hooks/useWorkDayEndsAt'
import Link from 'next/link'
import { getAppPath } from '../../../navigation/app'

const Container = styled(Link)`
  position: absolute;
  bottom: -20px;
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 14px;
  line-height: 1;
`

export const WorkdayEndStatus = () => {
  const [weekday] = useSelectedWeekday()
  const dayStartedAt = useStartOfWeekday(weekday)
  const { endHour, currentTime } = useDayOverview()
  const timelineEndsAt = dayStartedAt + convertDuration(endHour, 'h', 'ms')
  const workdayEndsAt = useWorkDayEndsAt()
  const workEndsIn = workdayEndsAt - currentTime

  const todayStartedAt = useStartOfDay()
  if (dayStartedAt !== todayStartedAt) {
    return null
  }

  if (timelineEndsAt > workdayEndsAt) {
    return null
  }

  return (
    <Container href={getAppPath('preferences')}>
      {currentTime < workdayEndsAt && (
        <Text color="contrast" weight="500" size={14}>
          <Text as="span" color="supporting">
            workday ends in
          </Text>{' '}
          {formatDuration(workEndsIn, 'ms')}
        </Text>
      )}
    </Container>
  )
}
