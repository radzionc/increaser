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

export const EditGoalForm = () => {
  const goalAttribute = useCurrentGoal()
  const [value, setValue] = useState<GoalFormShape>(goalAttribute)

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

    updateGoal({
      id: goalAttribute.id,
      fields,
    })
    onFinish()
  }, [
    goalAttribute.deadlineAt,
    goalAttribute.id,
    goalAttribute.name,
    goalAttribute.status,
    isDisabled,
    onFinish,
    updateGoal,
    value.deadlineAt,
    value.name,
    value.status,
  ])

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
