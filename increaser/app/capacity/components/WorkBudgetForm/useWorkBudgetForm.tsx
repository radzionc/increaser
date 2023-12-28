import { useForm } from 'react-hook-form'
import { MIN_IN_HOUR } from '@lib/utils/time'
import { useWeekTimeAllocation } from '@increaser/app/weekTimeAllocation/hooks/useWeekTimeAllocation'

export const maxHoursPerDay = 10
export const maxMinPerDay = maxHoursPerDay * MIN_IN_HOUR

export interface WorkBudgetFormShape {
  workdayMinutes: number
  weekendMinutes: number
}

export const useWorkBudgetForm = () => {
  const { allocation } = useWeekTimeAllocation()

  return useForm<WorkBudgetFormShape>({
    mode: 'onSubmit',
    defaultValues: {
      workdayMinutes: allocation[0],
      weekendMinutes: allocation[allocation.length - 1],
    },
  })
}
