import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { Text } from '@lib/ui/text'
import { useStartOfWeekday } from '@lib/ui/time/hooks/useStartOfWeekday'
import { useSelectedWeekday } from '@lib/ui/time/SelectedWeekdayProvider'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { formatDuration } from '@lib/utils/time/formatDuration'
import Link from 'next/link'
import styled from 'styled-components'

import { getAppPath } from '../../../navigation/app'
import { useWorkDayEndsAt } from '../../../schedule/hooks/useWorkDayEndsAt'

import { useDayOverview } from './DayOverviewProvider'

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
