import { useCallback, useMemo, useState } from 'react'
import { useCurrentGoal } from '../CurrentGoalProvider'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { GoalFormShape } from './GoalFormShape'
import { pick } from '@lib/utils/record/pick'
import { getUpdatedValues } from '@lib/utils/record/getUpdatedValues'
import { useUpdateUserEntityMutation } from '../../userEntity/api/useUpdateUserEntityMutation'
import { useDeleteUserEntityMutation } from '../../userEntity/api/useDeleteUserEntityMutation'
import { GoalFormFields } from './GoalFormFields'
import { ListItemForm } from '../../form/ListItemForm'
import { useLazySync } from '@lib/ui/hooks/useLazySync'
import { areEqualRecords } from '@lib/utils/record/areEqualRecords'
import { areArraysEqual } from '@lib/utils/array/areArraysEqual'
import { Button } from '@lib/ui/buttons/Button'

export const EditGoalForm = () => {
  const goal = useCurrentGoal()
  const { id } = goal
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

  useLazySync<Partial<GoalFormShape>>({
    value: useMemo(
      () =>
        getUpdatedValues({
          before: initialValue,
          after: value,
          comparators: {
            target: (one, another) => {
              if (one === another) return true

              if (!one || !another) return false

              return areEqualRecords(one, another)
            },
            taskFactories: areArraysEqual,
          },
        }),
      [initialValue, value],
    ),
    sync: useCallback(
      (fields) =>
        updateGoal({
          id,
          fields,
        }),
      [id, updateGoal],
    ),
  })

  return (
    <ListItemForm onClose={onFinish}>
      <GoalFormFields
        actions={
          <Button
            kind="alert"
            type="button"
            onClick={() => {
              deleteGoal(id)
              onFinish()
            }}
          >
            Delete
          </Button>
        }
        onClose={onFinish}
        value={value}
        onChange={setValue}
      />
    </ListItemForm>
  )
}
