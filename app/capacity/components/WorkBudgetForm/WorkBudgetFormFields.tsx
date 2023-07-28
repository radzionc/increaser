import { WorkBudgetFormShape } from 'capacity/components/WorkBudgetForm/useWorkBudgetForm'
import { Controller, UseFormReturn } from 'react-hook-form'
import { HSLA } from '@increaser/ui/ui/colors/HSLA'
import { VStack } from '@increaser/ui/ui/Stack'
import { MIN_IN_HOUR, S_IN_MIN } from 'utils/time'
import {
  defaultWeekendMinutes,
  defaultWorkdayMinutes,
} from 'weekTimeAllocation/WeekTimeAllocation'

import { WorkHoursInput } from './WorkHoursInput'

interface Props {
  form: UseFormReturn<WorkBudgetFormShape>
  workdayColor: HSLA
  weekendColor: HSLA
}

export const WorkBudgetFormFields = ({
  form,
  workdayColor,
  weekendColor,
}: Props) => {
  const { control } = form

  return (
    <VStack gap={4}>
      <Controller
        control={control}
        name="workdayMinutes"
        render={({ field: { value, onChange } }) => (
          <WorkHoursInput
            defaultValue={defaultWorkdayMinutes / MIN_IN_HOUR}
            color={workdayColor}
            value={Math.round(value / S_IN_MIN)}
            label="Workday"
            onChange={(v) => onChange(v * S_IN_MIN)}
            daysNumber={5}
          />
        )}
      />

      <Controller
        control={control}
        name="weekendMinutes"
        render={({ field: { value, onChange } }) => (
          <WorkHoursInput
            defaultValue={defaultWeekendMinutes / MIN_IN_HOUR}
            color={weekendColor}
            value={Math.round(value / S_IN_MIN)}
            label="Weekend"
            onChange={(v) => onChange(v * S_IN_MIN)}
            isOptional
            daysNumber={2}
          />
        )}
      />
    </VStack>
  )
}
