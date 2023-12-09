import { HStack } from '@increaser/ui/layout/Stack'
import { ManageEndOfWorkday } from './ManageEndOfWorkday'
import { ManageBedTime } from './ManageBedTime'
import { useAssertUserState } from 'user/state/UserStateContext'
import { TimeBoundaryDistance } from './TimeBoundaryDistance'
import { ManageStartOfWorkday } from './ManageStartOfWorkday'

export const ManageSchedule = () => {
  const { goalToFinishWorkBy, goalToGoToBedAt } = useAssertUserState()
  return (
    <HStack wrap="wrap" alignItems="center" gap={16}>
      <ManageStartOfWorkday />
      <ManageEndOfWorkday />
      <TimeBoundaryDistance value={goalToGoToBedAt - goalToFinishWorkBy} />
      <ManageBedTime />
    </HStack>
  )
}
