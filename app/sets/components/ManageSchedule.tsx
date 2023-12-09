import { HStack } from '@increaser/ui/layout/Stack'
import { ManageEndOfWorkday } from './ManageEndOfWorkday'
import { ManageBedTime } from './ManageBedTime'
import { useAssertUserState } from 'user/state/UserStateContext'
import { TimeBoundaryDistance } from './TimeBoundaryDistance'

export const ManageSchedule = () => {
  const { goalToFinishWorkBy, goalToGoToBedAt } = useAssertUserState()
  return (
    <HStack wrap="wrap" alignItems="center" gap={16}>
      <ManageEndOfWorkday />
      <TimeBoundaryDistance value={goalToGoToBedAt - goalToFinishWorkBy} />
      <ManageBedTime />
    </HStack>
  )
}
