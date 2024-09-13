import { useCallback, useMemo, useState } from 'react'
import { useCurrentGoal } from '../CurrentGoalProvider'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { GoalFormShape } from './GoalFormShape'
import { useIsGoalFormDisabled } from './useIsGoalFormDisabled'
import { pick } from '@lib/utils/record/pick'
import { EditDeleteFormFooter } from '@lib/ui/form/components/EditDeleteFormFooter'
import { getUpdatedValues } from '@lib/utils/record/getUpdatedValues'
import { useUpdateUserEntityMutation } from '../../userEntity/api/useUpdateUserEntityMutation'
import { useDeleteUserEntityMutation } from '../../userEntity/api/useDeleteUserEntityMutation'
import { GoalFormFields } from './GoalFormFields'
import { ListItemForm } from '../../form/ListItemForm'

export const EditGoalForm = () => {
  const goal = useCurrentGoal()
  const initialValue = useMemo(
    () => ({
      ...pick(goal, ['name', 'status', 'emoji']),
      plan: goal.plan ?? '',
      target: goal.target ?? null,
      taskFactories: goal.taskFactories ?? [],
      deadlineAt: goal.deadlineAt ?? null,
    }),
    [goal],
  )
  const [value, setValue] = useState<GoalFormShape>(initialValue)

  const { mutate: updateGoal } = useUpdateUserEntityMutation('goal')
  const { mutate: deleteGoal } = useDeleteUserEntityMutation('goal')

  const [, setActiveItemId] = useActiveItemId()

  const onFinish = useCallback(() => {
    setActiveItemId(null)
  }, [setActiveItemId])

  const isDisabled = useIsGoalFormDisabled(value)

  const onSubmit = useCallback(() => {
    if (isDisabled) {
      return
    }

    const fields = getUpdatedValues({
      before: initialValue,
      after: value,
    })

    if (fields) {
      updateGoal({
        id: goal.id,
        fields,
      })
    }

    onFinish()
  }, [goal.id, initialValue, isDisabled, onFinish, updateGoal, value])

  return (
    <ListItemForm
      onClose={onFinish}
      onSubmit={onSubmit}
      isDisabled={isDisabled}
    >
      <GoalFormFields value={value} onChange={setValue} onSubmit={onSubmit} />
      <EditDeleteFormFooter
        onDelete={() => {
          deleteGoal(goal.id)
          onFinish()
        }}
        onCancel={onFinish}
        isDisabled={isDisabled}
      />
    </ListItemForm>
  )
}
