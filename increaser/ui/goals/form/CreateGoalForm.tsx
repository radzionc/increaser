import { useCallback, useState } from 'react'
import { FinishableComponentProps } from '@lib/ui/props'
import { getId } from '@increaser/entities-utils/shared/getId'
import { Panel } from '@lib/ui/panel/Panel'
import { HStack } from '@lib/ui/layout/Stack'
import { Button } from '@lib/ui/buttons/Button'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { GoalStatusSelector } from './GoalStatusSelector'
import { GoalDeadlineInput } from './GoalDeadlineInput'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { GoalFormShape } from './GoalFormShape'
import { randomlyPick } from '@lib/utils/array/randomlyPick'
import { useIsGoalFormDisabled } from './useIsGoalFormDisabled'
import { EmojiInput } from '@increaser/app/ui/EmojiInput'
import { GoalTargetInput } from './GoalTargetInput'
import { defaultEmojis } from '@lib/utils/entities/EntityWithEmoji'
import { GoalTaskFactoriesInput } from './GoalTaskFactoriesInput'
import { EmojiTextInputFrame } from '../../form/EmojiTextInputFrame'
import { EmbeddedTitleInput } from '@lib/ui/inputs/EmbeddedTitleInput'
import { EmbeddedDescriptionInput } from '@lib/ui/inputs/EmbeddedDescriptionInput'
import { useCreateUserEntityMutation } from '../../userEntity/api/useCreateUserEntityMutation'

export const CreateGoalForm = ({ onFinish }: FinishableComponentProps) => {
  const [value, setValue] = useState<GoalFormShape>({
    name: '',
    status: 'inProgress',
    deadlineAt: null,
    emoji: randomlyPick(defaultEmojis),
    target: null,
    plan: '',
    taskFactories: [],
  })
  const { mutate } = useCreateUserEntityMutation('goal')

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
      <GoalDeadlineInput
        onChange={(deadlineAt) => setValue((prev) => ({ ...prev, deadlineAt }))}
        value={value.deadlineAt}
      />
      <GoalTargetInput
        onChange={(target) => setValue((prev) => ({ ...prev, target }))}
        value={value.target}
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
