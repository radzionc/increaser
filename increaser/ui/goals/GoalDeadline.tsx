import { HStack } from '@lib/ui/layout/Stack'
import { useCurrentGoal } from './CurrentGoalProvider'
import styled from 'styled-components'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { ClockIcon } from '@lib/ui/icons/ClockIcon'
import { getColor } from '@lib/ui/theme/getters'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { Text } from '@lib/ui/text'
import { useAssertUserState } from '../user/UserStateContext'
import { getGoalDeadlineTimestamp } from '@increaser/entities-utils/goal/getGoalDeadlineTimestamp'
import { formatGoalDeadline } from '@increaser/entities-utils/goal/formatGoalDeadline'
import { HStackSeparatedBy } from '@lib/ui/layout/StackSeparatedBy'
import { formatGoalTimeLeft } from '@increaser/entities-utils/goal/formatGoalTimeLeft'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'

const Container = styled(HStack)`
  font-size: 14px;
  align-items: center;
  gap: 8px;
  color: ${getColor('textSupporting')};
`

export const GoalDeadline = () => {
  const { dob } = useAssertUserState()
  const { deadlineAt } = useCurrentGoal()

  const now = useRhythmicRerender(convertDuration(1, 'min', 'ms'))
  const deadlineTimestamp = getGoalDeadlineTimestamp({
    value: deadlineAt,
    dob,
  })

  return (
    <Container>
      <IconWrapper>
        <ClockIcon />
      </IconWrapper>
      <HStackSeparatedBy gap={8} separator={'~'}>
        <Text>{formatGoalDeadline(deadlineAt)}</Text>
        {deadlineTimestamp > now && (
          <Text>{formatGoalTimeLeft(deadlineTimestamp)}</Text>
        )}
      </HStackSeparatedBy>
    </Container>
  )
}
