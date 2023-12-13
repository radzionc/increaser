import { useAssertUserState } from 'user/state/UserStateContext'
import { ScheduleCheckItem } from './ScheduleCheckItem'
import { convertDuration } from '@increaser/utils/time/convertDuration'
import { VStack } from '@increaser/ui/layout/Stack'

export const ScheduleReview = () => {
  const { goalToFinishWorkBy, goalToGoToBedAt, goalToWakeUpAt } =
    useAssertUserState()

  return (
    <VStack style={{ minWidth: 240 }} gap={12}>
      <ScheduleCheckItem
        value={
          goalToGoToBedAt - goalToFinishWorkBy >= convertDuration(2, 'h', 'min')
        }
        label="2 hours of relaxation before sleep"
      />
      <ScheduleCheckItem
        value={
          convertDuration(24, 'h', 'min') - goalToGoToBedAt + goalToWakeUpAt >=
          convertDuration(8, 'h', 'min')
        }
        label="Optimal 8 hours of sleep for health"
      />
    </VStack>
  )
}
