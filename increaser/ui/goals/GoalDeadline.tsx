import { HStack } from '@lib/ui/layout/Stack'
import { useCurrentGoal } from './CurrentGoalProvider'
import { format } from 'date-fns'
import styled from 'styled-components'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { ClockIcon } from '@lib/ui/icons/ClockIcon'
import { getColor } from '@lib/ui/theme/getters'
import { RhytmicRerender } from '@lib/ui/base/RhytmicRerender'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { intervalToDuration, formatDuration, Duration } from 'date-fns'
import { Text } from '@lib/ui/text'
import { fromDay, stringToDay } from '@lib/utils/time/Day'

const Container = styled(HStack)`
  font-size: 14px;
  align-items: center;
  gap: 4px;
  color: ${getColor('textSupporting')};
`

export const GoalDeadline = () => {
  const { deadlineAt: deadlineAtStr, status } = useCurrentGoal()

  if (!deadlineAtStr || status === 'done') return null

  const deadlineAt = fromDay(stringToDay(deadlineAtStr))

  return (
    <Container>
      <IconWrapper>
        <ClockIcon />
      </IconWrapper>
      {format(deadlineAt, 'dd MMM yyyy')}{' '}
      <RhytmicRerender
        interval={convertDuration(1, 'min', 'ms')}
        render={() => {
          const now = Date.now()
          if (now > deadlineAt) {
            return null
          }
          const duration = intervalToDuration({ start: now, end: deadlineAt })
          const extraPrecision: (keyof Duration)[] =
            deadlineAt - now < convertDuration(1, 'd', 'ms')
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
