import { WorkBudgetFormShape } from '@increaser/app/capacity/components/WorkBudgetForm/useWorkBudgetForm'
import { WorkBudgetFormFields } from '@increaser/app/capacity/components/WorkBudgetForm/WorkBudgetFormFields'
import { useEffect } from 'react'
import { UseFormReturn, useWatch } from 'react-hook-form'
import { useTheme } from 'styled-components'
import { useUpdateUserMutation } from '@increaser/app/user/mutations/useUpdateUserMutation'
import { useUserState } from '@increaser/app/user/state/UserStateContext'
import { getWeekTimeAllocation } from '@increaser/app/weekTimeAllocation/helpers/getWeekTimeAllocation'

interface Props {
  form: UseFormReturn<WorkBudgetFormShape>
}

export const WorkBudgetForm = ({ form }: Props) => {
  const { mutate: updateUser } = useUpdateUserMutation()

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
      updateUser({
        weekTimeAllocation,
      })
    }, 2000)

    return () => {
      clearTimeout(timeout)
    }
  }, [updateState, updateUser, weekendMinutes, workdayMinutes])

  const { colors } = useTheme()

  return (
    <WorkBudgetFormFields
      workdayColor={colors.success}
      weekendColor={colors.idle}
      form={form}
    />
  )
}
