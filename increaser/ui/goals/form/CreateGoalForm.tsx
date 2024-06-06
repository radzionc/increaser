import { useCallback, useMemo, useState } from 'react'
import { FinishableComponentProps } from '@lib/ui/props'
import { getId } from '@increaser/entities-utils/shared/getId'
import { Panel } from '@lib/ui/panel/Panel'
import { HStack } from '@lib/ui/layout/Stack'
import { Button } from '@lib/ui/buttons/Button'
import { useCreateGoalMutation } from '../api/useCreateGoalMutation'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { GoalStatus } from '@increaser/entities/Goal'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { GoalNameInput } from './GoalNameInput'
import { GoalStatusSelector } from './GoalStatusSelector'
import { GoalDeadlineInput } from './GoalDeadlineInput'

export const CreateGoalForm = ({ onFinish }: FinishableComponentProps) => {
  const { vision } = useAssertUserState()
  const [name, setName] = useState('')
  const [status, setStatus] = useState<GoalStatus>('inProgress')
  const [deadlineAt, setDeadlineAt] = useState<number | null>(null)

  const { mutate } = useCreateGoalMutation()

  const isDisabled = useMemo(() => {
    if (!name.trim()) {
      return 'Name is required'
    }
  }, [name])

  const onSubmit = useCallback(() => {
    if (isDisabled) return

    const orders = Object.values(vision).map((attribute) => attribute.order)
    const order = orders.length ? Math.max(...orders) + 1 : 0
    mutate({
      id: getId(),
      name,
      status,
      deadlineAt,
      order,
    })
    onFinish()
  }, [isDisabled, mutate, name, onFinish, status, vision, deadlineAt])

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
    >
      <GoalNameInput
        autoFocus
        onChange={setName}
        value={name}
        onSubmit={onSubmit}
      />
      <GoalDeadlineInput value={deadlineAt} onChange={setDeadlineAt} />
      <HStack justifyContent="space-between" fullWidth alignItems="center">
        <GoalStatusSelector value={status} onChange={setStatus} />
        <HStack alignItems="center" gap={8}>
          <Button onClick={onFinish} kind="secondary">
            Cancel
          </Button>
          <Button isDisabled={isDisabled}>Submit</Button>
        </HStack>
      </HStack>
    </Panel>
  )
}
