import { useCallback, useState } from 'react'
import { useCurrentGoal } from '../CurrentGoalProvider'
import { Goal } from '@increaser/entities/Goal'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { GoalFormShape } from './GoalFormShape'
import { useIsGoalFormDisabled } from './useIsGoalFormDisabled'
import { pick } from '@lib/utils/record/pick'
import { EditDeleteFormFooter } from '@lib/ui/form/components/EditDeleteFormFooter'
import { getUpdatedValues } from '@lib/utils/record/getUpdatedValues'
import { omit } from '@lib/utils/record/omit'
import { useUpdateUserEntityMutation } from '../../userEntity/api/useUpdateUserEntityMutation'
import { useDeleteUserEntityMutation } from '../../userEntity/api/useDeleteUserEntityMutation'
import { GoalFormFields } from './GoalFormFields'
import { ListItemForm } from '../../form/ListItemForm'

export const EditGoalForm = () => {
  const goal = useCurrentGoal()
  const [value, setValue] = useState<GoalFormShape>({
    ...pick(goal, ['name', 'status', 'emoji']),
    plan: goal.plan ?? '',
    target: goal.target ?? null,
    taskFactories: goal.taskFactories ?? [],
    deadlineAt: goal.deadlineAt ?? null,
  })

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

    const fields: Partial<Omit<Goal, 'id'>> = getUpdatedValues(
      omit(goal, 'id'),
      value,
    )

    updateGoal({
      id: goal.id,
      fields,
    })
    onFinish()
  }, [goal, isDisabled, onFinish, updateGoal, value])

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
