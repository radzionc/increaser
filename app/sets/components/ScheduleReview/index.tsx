import { useAssertUserState } from 'user/state/UserStateContext'
import { ScheduleCheckItem } from './ScheduleCheckItem'
import { convertDuration } from '@increaser/utils/time/convertDuration'
import { VStack } from '@increaser/ui/layout/Stack'

const sleepHoursTarget = 8
const intermittentFastingHoursTarget = 16
const wakeUpFirstMealHoursTarget = 1
const lastMealBedTimeHoursTarget = 3

export const ScheduleReview = () => {
  const {
    goalToFinishWorkBy,
    goalToGoToBedAt,
    goalToWakeUpAt,
    firstMealStartsAt,
    lastMealStartsAt,
  } = useAssertUserState()

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
          convertDuration(sleepHoursTarget, 'h', 'min')
        }
        label={`Optimal ${sleepHoursTarget} hours of sleep for health`}
      />
      <ScheduleCheckItem
        value={
          convertDuration(24, 'h', 'min') -
            (lastMealStartsAt - firstMealStartsAt) >=
          convertDuration(intermittentFastingHoursTarget, 'h', 'min')
        }
        label={`${intermittentFastingHoursTarget} hours of intermittent fasting`}
      />
      <ScheduleCheckItem
        value={
          firstMealStartsAt - goalToWakeUpAt >=
          convertDuration(wakeUpFirstMealHoursTarget, 'h', 'min')
        }
        label={`${wakeUpFirstMealHoursTarget} hours between wake up and first meal`}
      />
      <ScheduleCheckItem
        value={
          goalToGoToBedAt - lastMealStartsAt >=
          convertDuration(lastMealBedTimeHoursTarget, 'h', 'min')
        }
        label={`${lastMealBedTimeHoursTarget} hours between last meal and bed time`}
      />
    </VStack>
  )
}
