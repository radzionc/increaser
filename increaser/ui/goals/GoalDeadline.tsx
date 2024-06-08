import { HStack } from '@lib/ui/layout/Stack'
import { useCurrentGoal } from './CurrentGoalProvider'
import styled from 'styled-components'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { ClockIcon } from '@lib/ui/icons/ClockIcon'
import { getColor } from '@lib/ui/theme/getters'
import { RhytmicRerender } from '@lib/ui/base/RhytmicRerender'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { Text } from '@lib/ui/text'
import { useAssertUserState } from '../user/UserStateContext'
import { getGoalDeadlineTimestamp } from '@increaser/entities-utils/goal/getGoalDeadlineTimestamp'
import { formatGoalDeadline } from '@increaser/entities-utils/goal/formatGoalDeadline'
import { HStackSeparatedBy } from '@lib/ui/layout/StackSeparatedBy'
import { formatGoalTimeLeft } from '@increaser/entities-utils/goal/formatGoalTimeLeft'

const Container = styled(HStack)`
  font-size: 14px;
  align-items: center;
  gap: 8px;
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
      <HStackSeparatedBy gap={8} separator={'~'}>
        <Text>{formatGoalDeadline(deadlineAt)}</Text>
        <RhytmicRerender
          interval={convertDuration(1, 'min', 'ms')}
          render={() => {
            const deadlineTimestamp = getGoalDeadlineTimestamp({
              value: deadlineAt,
              dob,
            })

            if (deadlineTimestamp < Date.now()) {
              return null
            }

            return <Text>{formatGoalTimeLeft(deadlineTimestamp)}</Text>
          }}
        />
      </HStackSeparatedBy>
    </Container>
  )
}
