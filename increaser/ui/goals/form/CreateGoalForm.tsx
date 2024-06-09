import { useCallback, useState } from 'react'
import { FinishableComponentProps } from '@lib/ui/props'
import { getId } from '@increaser/entities-utils/shared/getId'
import { Panel } from '@lib/ui/panel/Panel'
import { HStack } from '@lib/ui/layout/Stack'
import { Button } from '@lib/ui/buttons/Button'
import { useCreateGoalMutation } from '../api/useCreateGoalMutation'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { GoalNameInput } from './GoalNameInput'
import { GoalStatusSelector } from './GoalStatusSelector'
import { GoalDeadlineInput } from './GoalDeadlineInput'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { GoalFormShape } from './GoalFormShape'
import { randomlyPick } from '@lib/utils/array/randomlyPick'
import { defaultEmojis } from '../../projects/EnhancedProject'
import { useIsGoalFormDisabled } from './useIsGoalFormDisabled'
import { EmojiInput } from '@increaser/app/ui/EmojiInput'
import { GoalFormHeader } from './GoalFormHeader'

export const CreateGoalForm = ({ onFinish }: FinishableComponentProps) => {
  const { vision } = useAssertUserState()
  const [value, setValue] = useState<GoalFormShape>({
    name: '',
    status: 'inProgress',
    deadlineAt: null,
    emoji: randomlyPick(defaultEmojis),
  })
  const { mutate } = useCreateGoalMutation()

  const isDisabled = useIsGoalFormDisabled(value)

  const onSubmit = useCallback(() => {
    if (isDisabled) return

    const orders = Object.values(vision).map((attribute) => attribute.order)
    const order = orders.length ? Math.max(...orders) + 1 : 0
    mutate({
      id: getId(),
      ...value,
      deadlineAt: shouldBePresent(value.deadlineAt),
      order,
    })
    onFinish()
  }, [isDisabled, mutate, onFinish, value, vision])

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
      <GoalDeadlineInput
        onChange={(deadlineAt) => setValue((prev) => ({ ...prev, deadlineAt }))}
        value={value.deadlineAt}
      />
      <HStack justifyContent="space-between" fullWidth alignItems="center">
        <GoalStatusSelector
          onChange={(status) => setValue((prev) => ({ ...prev, status }))}
          value={value.status}
        />
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
