import { HStack } from '@increaser/ui/layout/Stack'
import { ManageEndOfWorkday } from './ManageEndOfWorkday'
import { ManageBedTime } from './ManageBedTime'
import { useAssertUserState } from 'user/state/UserStateContext'
import {
  TimeBoundaryDistance,
  TimeBoundaryDistanceKind,
} from './TimeBoundaryDistance'
import { ManageStartOfWorkday } from './ManageStartOfWorkday'
import { DayMoments } from '@increaser/entities/User'
import { convertDuration } from '@increaser/utils/time/convertDuration'

const getWorkEndToBedDistanceKind = ({
  goalToGoToBedAt,
  goalToFinishWorkBy,
}: Pick<
  DayMoments,
  'goalToFinishWorkBy' | 'goalToGoToBedAt'
>): TimeBoundaryDistanceKind => {
  const distance = goalToGoToBedAt - goalToFinishWorkBy

  if (distance < convertDuration(2, 'h', 'min')) {
    return 'idle'
  }

  if (distance < convertDuration(1, 'h', 'min')) {
    return 'alert'
  }

  return 'success'
}

export const ManageSchedule = () => {
  const { goalToStartWorkAt, goalToFinishWorkBy, goalToGoToBedAt } =
    useAssertUserState()

  return (
    <HStack fullWidth wrap="wrap" alignItems="center" gap={16}>
      <ManageStartOfWorkday />
      <TimeBoundaryDistance
        kind="regular"
        value={goalToFinishWorkBy - goalToStartWorkAt}
      />
      <ManageEndOfWorkday />
      <TimeBoundaryDistance
        kind={getWorkEndToBedDistanceKind({
          goalToFinishWorkBy,
          goalToGoToBedAt,
        })}
        value={goalToGoToBedAt - goalToFinishWorkBy}
      />
      <ManageBedTime />
    </HStack>
  )
}
