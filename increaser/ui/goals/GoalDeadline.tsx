import { HStack } from '@lib/ui/layout/Stack'
import { useCurrentGoal } from './CurrentGoalProvider'
import styled from 'styled-components'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { ClockIcon } from '@lib/ui/icons/ClockIcon'
import { getColor } from '@lib/ui/theme/getters'
import { RhytmicRerender } from '@lib/ui/base/RhytmicRerender'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { intervalToDuration, formatDuration, Duration } from 'date-fns'
import { Text } from '@lib/ui/text'
import { useAssertUserState } from '../user/UserStateContext'
import { getGoalDeadlineTimestamp } from '@increaser/entities-utils/goal/getGoalDeadlineTimestamp'
import { formatGoalDeadline } from '@increaser/entities-utils/goal/formatGoalDeadline'

const Container = styled(HStack)`
  font-size: 14px;
  align-items: center;
  gap: 4px;
  color: ${getColor('textSupporting')};
`

export const GoalDeadline = () => {
  const { dob } = useAssertUserState()
  const { deadlineAt, status } = useCurrentGoal()

  if (!deadlineAt || status === 'done') return null

  return (
    <Container>
      <IconWrapper>
        <ClockIcon />
      </IconWrapper>
      {formatGoalDeadline(deadlineAt)}{' '}
      <RhytmicRerender
        interval={convertDuration(1, 'min', 'ms')}
        render={() => {
          const now = Date.now()
          const deadlineTimestamp = getGoalDeadlineTimestamp({
            value: deadlineAt,
            dob,
          })
          if (now > deadlineTimestamp) {
            return null
          }
          const duration = intervalToDuration({
            start: now,
            end: deadlineTimestamp,
          })

          const extraPrecision: (keyof Duration)[] =
            deadlineTimestamp - now < convertDuration(1, 'd', 'ms')
              ? ['hours', 'minutes']
              : []
          const durationStr = formatDuration(duration, {
            format: ['years', 'months', 'days', ...extraPrecision],
          })
          return <Text as="span">({durationStr})</Text>
        }}
      />
    </Container>
  )
}
