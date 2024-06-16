import { useCallback, useState } from 'react'
import { FinishableComponentProps } from '@lib/ui/props'
import { getId } from '@increaser/entities-utils/shared/getId'
import { Panel } from '@lib/ui/panel/Panel'
import { HStack } from '@lib/ui/layout/Stack'
import { Button } from '@lib/ui/buttons/Button'
import { useCreateGoalMutation } from '../api/useCreateGoalMutation'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
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
import { GoalPlanInput } from './GoalPlanInput'
import { GoalTargetInput } from './GoalTargetInput'

export const CreateGoalForm = ({ onFinish }: FinishableComponentProps) => {
  const [value, setValue] = useState<GoalFormShape>({
    name: '',
    status: 'inProgress',
    deadlineAt: null,
    emoji: randomlyPick(defaultEmojis),
    target: null,
    plan: '',
  })
  const { mutate } = useCreateGoalMutation()

  const isDisabled = useIsGoalFormDisabled(value)

  const onSubmit = useCallback(() => {
    if (isDisabled) return

    mutate({
      id: getId(),
      ...value,
      deadlineAt: shouldBePresent(value.deadlineAt),
    })
    onFinish()
  }, [isDisabled, mutate, onFinish, value])

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
      <GoalTargetInput
        onChange={(target) => setValue((prev) => ({ ...prev, target }))}
        value={value.target}
      />
      <GoalPlanInput
        onChange={(plan) => setValue((prev) => ({ ...prev, plan }))}
        value={value.plan}
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
