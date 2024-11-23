import { useCurrentGoal } from './CurrentGoalProvider'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { Text } from '@lib/ui/text'
import { useUser } from '@increaser/ui/user/state/user'
import { getGoalDeadlineTimestamp } from '@increaser/entities-utils/goal/getGoalDeadlineTimestamp'
import { formatGoalDeadline } from '@increaser/entities-utils/goal/formatGoalDeadline'

import { formatGoalTimeLeft } from '@increaser/entities-utils/goal/formatGoalTimeLeft'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { MapPinIcon } from '@lib/ui/icons/MapPinIcon'

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
