import { useLazySync } from '@lib/ui/hooks/useLazySync'
import { OnCloseProp } from '@lib/ui/props'
import { useStateCorrector } from '@lib/ui/state/useStateCorrector'
import { areArraysEqual } from '@lib/utils/array/areArraysEqual'
import { areEqualRecords } from '@lib/utils/record/areEqualRecords'
import { getUpdatedValues } from '@lib/utils/record/getUpdatedValues'
import { pick } from '@lib/utils/record/pick'
import { useCallback, useMemo, useState } from 'react'

import { ListItemForm } from '../../form/ListItemForm'
import { PanelFormDeleteButton } from '../../form/panel/PanelFormDeleteButton'
import { useDeleteUserEntityMutation } from '../../userEntity/api/useDeleteUserEntityMutation'
import { useUpdateUserEntityMutation } from '../../userEntity/api/useUpdateUserEntityMutation'
import { useCurrentGoal } from '../CurrentGoalProvider'

import { GoalFormFields } from './GoalFormFields'
import { GoalFormShape } from './GoalFormShape'
import { useGoalFormCorrector } from './useGoalFormCorrector'

export const EditGoalForm = ({ onClose }: OnCloseProp) => {
  const goal = useCurrentGoal()
  const { id } = goal
  const initialValue = useMemo(
    () => ({
      ...pick(goal, ['name', 'status', 'emoji']),
      plan: goal.plan ?? '',
      target: goal.target ?? null,
      taskFactories: goal.taskFactories ?? [],
      habits: goal.habits ?? [],
      deadlineAt: goal.deadlineAt ?? null,
      principles: goal.principles ?? [],
      vision: goal.vision ?? [],
    }),
    [goal],
  )
  const [value, setValue] = useStateCorrector(
    useState<GoalFormShape>(initialValue),
    useGoalFormCorrector(),
  )

  const { mutate: updateGoal } = useUpdateUserEntityMutation('goal')
  const { mutate: deleteGoal } = useDeleteUserEntityMutation('goal')

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
            habits: areArraysEqual,
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
    <ListItemForm onClose={onClose}>
      <GoalFormFields
        actions={
          <PanelFormDeleteButton
            onClick={() => {
              deleteGoal(id)
              onClose()
            }}
          />
        }
        onClose={onClose}
        value={value}
        onChange={setValue}
      />
    </ListItemForm>
  )
}
