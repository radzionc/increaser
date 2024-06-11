import { useCallback, useEffect, useState } from 'react'
import { Panel } from '@lib/ui/panel/Panel'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Button } from '@lib/ui/buttons/Button'
import { useCurrentGoal } from '../CurrentGoalProvider'
import { Goal } from '@increaser/entities/Goal'
import { useUpdateGoalMutation } from '../api/useUpdateGoalMutation'
import { useDeleteGoalMutation } from '../api/useDeleteGoalMutation'
import { GoalNameInput } from './GoalNameInput'
import { GoalStatusSelector } from './GoalStatusSelector'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { GoalDeadlineInput } from './GoalDeadlineInput'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { GoalFormShape } from './GoalFormShape'
import { useIsGoalFormDisabled } from './useIsGoalFormDisabled'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { EmojiInput } from '@increaser/app/ui/EmojiInput'
import { GoalFormHeader } from './GoalFormHeader'
import { GoalPlanInput } from './GoalPlanInput'
import { GoalTargetInput } from './GoalTargetInput'

export const EditGoalForm = () => {
  const goalAttribute = useCurrentGoal()
  const [value, setValue] = useState<GoalFormShape>({
    name: goalAttribute.name,
    status: goalAttribute.status,
    emoji: goalAttribute.emoji,
    deadlineAt: goalAttribute.deadlineAt,
    plan: goalAttribute.plan ?? '',
    target: goalAttribute.target ?? null,
  })

  const { mutate: updateGoal } = useUpdateGoalMutation()
  const { mutate: deleteGoal } = useDeleteGoalMutation()

  const [, setActiveItemId] = useActiveItemId()

  const onFinish = useCallback(() => {
    setActiveItemId(null)
  }, [setActiveItemId])

  useEffect(() => {
    return () => {
      onFinish()
    }
  }, [onFinish])

  const isDisabled = useIsGoalFormDisabled(value)

  const onSubmit = useCallback(() => {
    if (isDisabled) {
      return
    }

    const fields: Partial<Omit<Goal, 'id'>> = {}
    if (value.name !== goalAttribute.name) {
      fields.name = value.name
    }
    if (value.status !== goalAttribute.status) {
      fields.status = value.status
    }
    if (value.deadlineAt !== goalAttribute.deadlineAt) {
      fields.deadlineAt = shouldBePresent(value.deadlineAt)
    }
    if (value.emoji !== goalAttribute.emoji) {
      fields.emoji = value.emoji
    }
    if (value.plan !== goalAttribute.plan) {
      fields.plan = value.plan
    }
    if (value.target !== goalAttribute.target) {
      fields.target = value.target
    }

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
      <GoalFormHeader>
        <div>
          <EmojiInput
            value={value.emoji}
            onChange={(emoji) => setValue((prev) => ({ ...prev, emoji }))}
          />
        </div>
        <GoalNameInput
          autoFocus
          onChange={(name) => setValue((prev) => ({ ...prev, name }))}
          value={value.name}
          onSubmit={onSubmit}
        />
      </GoalFormHeader>
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
      <GoalPlanInput
        onChange={(plan) => setValue((prev) => ({ ...prev, plan }))}
        value={value.plan}
      />
      <HStack
        wrap="wrap"
        justifyContent="space-between"
        fullWidth
        alignItems="center"
        gap={20}
      >
        <Button
          kind="alert"
          type="button"
          onClick={() => {
            deleteGoal({ id: goalAttribute.id })
            onFinish()
          }}
        >
          Delete
        </Button>
        <HStack alignItems="center" gap={8}>
          <Button isDisabled={isDisabled} onClick={onFinish} kind="secondary">
            Cancel
          </Button>
          <Button>Save</Button>
        </HStack>
      </HStack>
    </Panel>
  )
}
