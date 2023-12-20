import { useAssertUserState } from 'user/state/UserStateContext'
import { ScheduleCheckItem } from './ScheduleCheckItem'
import { convertDuration } from '@increaser/utils/time/convertDuration'
import { VStack } from '@increaser/ui/layout/Stack'
import { Text } from '@increaser/ui/text'

const sleepHoursTarget = 8
const intermittentFastingHoursTarget = 16
const wakeUpFirstMealMinutesTarget = 60
const lastMealBedTimeHoursTarget = 3

export const ScheduleReview = () => {
  const { finishWorkAt, goToBedAt, wakeUpAt, firstMealAt, lastMealAt } =
    useAssertUserState()

  return (
    <VStack style={{ maxWidth: 320, minWidth: 240 }} gap={16}>
      <Text weight="bold">Healthy schedule</Text>
      <VStack gap={12}>
        <ScheduleCheckItem
          value={
            convertDuration(1, 'd', 'min') - (lastMealAt - firstMealAt) >=
            convertDuration(intermittentFastingHoursTarget, 'h', 'min')
          }
          label={`${intermittentFastingHoursTarget} hours of intermittent fasting`}
        />
        <ScheduleCheckItem
          value={firstMealAt - wakeUpAt >= wakeUpFirstMealMinutesTarget}
          label={`No food ${wakeUpFirstMealMinutesTarget} minutes after wake up`}
        />
        <ScheduleCheckItem
          value={
            goToBedAt - lastMealAt >=
            convertDuration(lastMealBedTimeHoursTarget, 'h', 'min')
          }
          label={`No food ${lastMealBedTimeHoursTarget} hours before sleep`}
        />
        <ScheduleCheckItem
          value={goToBedAt - finishWorkAt >= convertDuration(2, 'h', 'min')}
          label="2 hours of relaxation before bed"
        />
        <ScheduleCheckItem
          value={
            convertDuration(1, 'd', 'min') - goToBedAt + wakeUpAt >=
            convertDuration(sleepHoursTarget, 'h', 'min')
          }
          label={`Optimal ${sleepHoursTarget} hours of sleep for health`}
        />
      </VStack>
    </VStack>
  )
}
