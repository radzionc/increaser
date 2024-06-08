import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { useKey } from 'react-use'
import { Panel } from '@lib/ui/panel/Panel'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Button } from '@lib/ui/buttons/Button'
import { preventDefault } from '@lib/ui/utils/preventDefault'
import { useCurrentGoal } from '../CurrentGoalProvider'
import { Goal, GoalStatus } from '@increaser/entities/Goal'
import { useUpdateGoalMutation } from '../api/useUpdateGoalMutation'
import { useDeleteGoalMutation } from '../api/useDeleteGoalMutation'
import { GoalNameInput } from './GoalNameInput'
import { GoalStatusSelector } from './GoalStatusSelector'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { GoalDeadlineInput } from './GoalDeadlineInput'

export const EditGoalForm = () => {
  const goalAttribute = useCurrentGoal()
  const [name, setName] = useState(goalAttribute.name)
  const [status, setStatus] = useState<GoalStatus>(goalAttribute.status)
  const [deadlineAt, setDeadlineAt] = useState<string | null>(
    goalAttribute.deadlineAt ?? null,
  )

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

  useKey('Escape', onFinish)

  const isDisabled = useMemo(() => {
    if (!name.trim()) {
      return 'Name is required'
    }
  }, [name])

  const handleSubmit = () => {
    if (isDisabled) {
      return
    }

    const fields: Partial<Omit<Goal, 'id'>> = {}
    if (name !== goalAttribute.name) {
      fields.name = name
    }
    if (status !== goalAttribute.status) {
      fields.status = status
    }
    if (deadlineAt !== goalAttribute.deadlineAt) {
      fields.deadlineAt = deadlineAt
    }

    updateGoal({
      id: goalAttribute.id,
      fields,
    })
    onFinish()
  }

  return (
    <Panel
      withSections
      kind="secondary"
      as="form"
      style={{ width: '100%' }}
      onSubmit={preventDefault<FormEvent<HTMLFormElement>>(() =>
        handleSubmit(),
      )}
    >
      <VStack gap={28}>
        <GoalNameInput
          autoFocus
          onChange={setName}
          value={name}
          onSubmit={handleSubmit}
        />
        <VStack alignItems="start">
          <GoalStatusSelector value={status} onChange={setStatus} />
        </VStack>
      </VStack>
      <GoalDeadlineInput value={deadlineAt} onChange={setDeadlineAt} />
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
