import { WorkBudgetFormShape } from 'capacity/components/WorkBudgetForm/useWorkBudgetForm'
import { WorkBudgetFormFields } from 'capacity/components/WorkBudgetForm/WorkBudgetFormFields'
import { useEffect } from 'react'
import { UseFormReturn, useWatch } from 'react-hook-form'
import { useTheme } from 'styled-components'
import { useUserState } from 'user/state/UserStateContext'
import { getWeekTimeAllocation } from 'weekTimeAllocation/helpers/getWeekTimeAllocation'
import { useUpdateWeekTimeAllocation } from 'weekTimeAllocation/hooks/useUpdateWeekTimeAllocation'

interface Props {
  form: UseFormReturn<WorkBudgetFormShape>
}

export const WorkBudgetForm = ({ form }: Props) => {
  const { mutate: updateAllocation } = useUpdateWeekTimeAllocation()

  const { control } = form

  const workdayMinutes = useWatch({
    control,
    name: 'workdayMinutes',
  })
  const weekendMinutes = useWatch({
    control,
    name: 'weekendMinutes',
  })

  const { updateState } = useUserState()

  useEffect(() => {
    const weekTimeAllocation = getWeekTimeAllocation(
      workdayMinutes,
      weekendMinutes,
    )
    updateState({
      weekTimeAllocation,
    })

    const timeout = setTimeout(() => {
      updateAllocation(weekTimeAllocation)
    }, 2000)

    return () => {
      clearTimeout(timeout)
    }
  }, [updateAllocation, updateState, weekendMinutes, workdayMinutes])

  const { colors } = useTheme()

  return (
    <WorkBudgetFormFields
      workdayColor={colors.success}
      weekendColor={colors.idle}
      form={form}
    />
  )
}
