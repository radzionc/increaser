import { useCurrentGoal } from './CurrentGoalProvider'
import { ClockIcon } from '@lib/ui/icons/ClockIcon'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { Text } from '@lib/ui/text'
import { useAssertUserState } from '../user/UserStateContext'
import { getGoalDeadlineTimestamp } from '@increaser/entities-utils/goal/getGoalDeadlineTimestamp'
import { formatGoalDeadline } from '@increaser/entities-utils/goal/formatGoalDeadline'
import { HStackSeparatedBy } from '@lib/ui/layout/StackSeparatedBy'
import { formatGoalTimeLeft } from '@increaser/entities-utils/goal/formatGoalTimeLeft'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { GoalSection } from './GoalSection'

export const GoalDeadline = () => {
  const { dob } = useAssertUserState()
  const { deadlineAt } = useCurrentGoal()

  const now = useRhythmicRerender(convertDuration(1, 'min', 'ms'))
  const deadlineTimestamp = getGoalDeadlineTimestamp({
    deadlineAt,
    dob,
  })

  return (
    <GoalSection icon={<ClockIcon />}>
      <HStackSeparatedBy gap={8} separator={'~'}>
        <Text>{formatGoalDeadline(deadlineAt)}</Text>
        {deadlineTimestamp > now && (
          <Text>{formatGoalTimeLeft(deadlineTimestamp)}</Text>
        )}
      </HStackSeparatedBy>
    </GoalSection>
  )
}
