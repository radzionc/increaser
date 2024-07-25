import { useCallback, useState } from 'react'
import { Panel } from '@lib/ui/panel/Panel'
import { VStack } from '@lib/ui/layout/Stack'
import { useCurrentGoal } from '../CurrentGoalProvider'
import { Goal } from '@increaser/entities/Goal'
import { useUpdateGoalMutation } from '../api/useUpdateGoalMutation'
import { useDeleteGoalMutation } from '../api/useDeleteGoalMutation'
import { GoalStatusSelector } from './GoalStatusSelector'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { GoalDeadlineInput } from './GoalDeadlineInput'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { GoalFormShape } from './GoalFormShape'
import { useIsGoalFormDisabled } from './useIsGoalFormDisabled'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { EmojiInput } from '@increaser/app/ui/EmojiInput'
import { GoalTargetInput } from './GoalTargetInput'
import { GoalTaskFactoriesInput } from './GoalTaskFactoriesInput'
import { pick } from '@lib/utils/record/pick'
import { EditDeleteFormFooter } from '@lib/ui/form/components/EditDeleteFormFooter'
import { getUpdatedValues } from '@lib/utils/record/getUpdatedValues'
import { omit } from '@lib/utils/record/omit'
import { EmojiTextInputFrame } from '../../form/EmojiTextInputFrame'
import { EmbeddedTitleInput } from '@lib/ui/inputs/EmbeddedTitleInput'
import { EmbeddedDescriptionInput } from '@lib/ui/inputs/EmbeddedDescriptionInput'

export const EditGoalForm = () => {
  const goalAttribute = useCurrentGoal()
  const [value, setValue] = useState<GoalFormShape>({
    ...pick(goalAttribute, ['name', 'status', 'emoji', 'deadlineAt']),
    plan: goalAttribute.plan ?? '',
    target: goalAttribute.target ?? null,
    taskFactories: goalAttribute.taskFactories ?? [],
  })

  const { mutate: updateGoal } = useUpdateGoalMutation()
  const { mutate: deleteGoal } = useDeleteGoalMutation()

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
      omit(goalAttribute, 'id'),
      {
        ...value,
        deadlineAt: shouldBePresent(value.deadlineAt),
      },
    )

    updateGoal({
      id: goalAttribute.id,
      fields,
    })
    onFinish()
  }, [goalAttribute, isDisabled, onFinish, updateGoal, value])

  return (
    <Panel
      withSections
      kind="secondary"
      as="form"
      {...getFormProps({
        onClose: onFinish,
        isDisabled,
        onSubmit,
      })}
      style={{ width: '100%' }}
    >
      <EmojiTextInputFrame>
        <div>
          <EmojiInput
            value={value.emoji}
            onChange={(emoji) => setValue((prev) => ({ ...prev, emoji }))}
          />
        </div>
        <EmbeddedTitleInput
          placeholder="Describe your goal"
          autoFocus
          onChange={(name) => setValue((prev) => ({ ...prev, name }))}
          value={value.name}
          onSubmit={onSubmit}
        />
      </EmojiTextInputFrame>
      <VStack alignItems="start">
        <GoalStatusSelector
          value={value.status}
          onChange={(status) => setValue((prev) => ({ ...prev, status }))}
        />
      </VStack>
      <GoalDeadlineInput
        value={value.deadlineAt}
        onChange={(deadlineAt) => setValue((prev) => ({ ...prev, deadlineAt }))}
      />
      <GoalTargetInput
        value={value.target}
        onChange={(target) => setValue((prev) => ({ ...prev, target }))}
      />
      <EmbeddedDescriptionInput
        label="Your plan"
        placeholder="How are you going to achieve this goal? What's your plan?"
        onChange={(plan) => setValue((prev) => ({ ...prev, plan }))}
        value={value.plan}
      />
      <GoalTaskFactoriesInput
        onChange={(taskFactories) =>
          setValue((prev) => ({ ...prev, taskFactories }))
        }
        value={value.taskFactories}
      />
      <EditDeleteFormFooter
        onDelete={() => {
          deleteGoal(goalAttribute.id)
          onFinish()
        }}
        onCancel={onFinish}
        isDisabled={isDisabled}
      />
    </Panel>
  )
}
