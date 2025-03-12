import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { MapPinIcon } from '@lib/ui/icons/MapPinIcon'
import { Text } from '@lib/ui/text'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { formatGoalDeadline } from '@product/entities-utils/goal/formatGoalDeadline'
import { formatGoalTimeLeft } from '@product/entities-utils/goal/formatGoalTimeLeft'
import { getGoalDeadlineTimestamp } from '@product/entities-utils/goal/getGoalDeadlineTimestamp'
import { useUser } from '@product/ui/user/state/user'

import { useCurrentGoal } from './CurrentGoalProvider'

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
    <Text color="primary" centerVertically style={{ gap: 12 }}>
      <MapPinIcon style={{ fontSize: 16 }} />

      <Text as="span" centerVertically style={{ gap: 6 }}>
        {formatGoalDeadline(deadlineAt)}
        {deadlineTimestamp > now && (
          <Text as="span">({formatGoalTimeLeft(deadlineTimestamp)} left)</Text>
        )}
      </Text>
    </Text>
  )
}
