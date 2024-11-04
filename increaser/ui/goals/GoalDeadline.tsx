import { useCurrentGoal } from './CurrentGoalProvider'
import { ClockIcon } from '@lib/ui/icons/ClockIcon'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { Text } from '@lib/ui/text'
import { useUser } from '@increaser/ui/user/state/user'
import { getGoalDeadlineTimestamp } from '@increaser/entities-utils/goal/getGoalDeadlineTimestamp'
import { formatGoalDeadline } from '@increaser/entities-utils/goal/formatGoalDeadline'
import { HStackSeparatedBy } from '@lib/ui/layout/StackSeparatedBy'
import { formatGoalTimeLeft } from '@increaser/entities-utils/goal/formatGoalTimeLeft'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'

export const GoalDeadline = () => {
  const { dob } = useUser()
  const { deadlineAt } = useCurrentGoal()

  const now = useRhythmicRerender(convertDuration(1, 'min', 'ms'))

  if (!deadlineAt) return null

  const deadlineTimestamp = getGoalDeadlineTimestamp({
    deadlineAt,
    dob,
  })

  return (
    <HStackSeparatedBy gap={8} wrap="wrap" separator={'~'}>
      <Text centerVertically style={{ gap: 8 }}>
        <ClockIcon />
        <span>{formatGoalDeadline(deadlineAt)}</span>
      </Text>
      {deadlineTimestamp > now && (
        <Text color="primary">
          {formatGoalTimeLeft(deadlineTimestamp)} left
        </Text>
      )}
    </HStackSeparatedBy>
  )
}
