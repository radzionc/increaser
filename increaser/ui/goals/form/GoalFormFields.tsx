import { VStack } from '@lib/ui/layout/Stack'
import { GoalStatusSelector } from './GoalStatusSelector'
import { GoalDeadlineInput } from './GoalDeadlineInput'
import { GoalFormShape } from './GoalFormShape'
import { EmojiInput } from '@increaser/app/ui/EmojiInput'
import { GoalTargetInput } from './GoalTargetInput'
import { GoalTaskFactoriesInput } from './GoalTaskFactoriesInput'
import { EmojiTextInputFrame } from '../../form/EmojiTextInputFrame'
import { EmbeddedTitleInput } from '@lib/ui/inputs/EmbeddedTitleInput'
import { EmbeddedDescriptionInput } from '@lib/ui/inputs/EmbeddedDescriptionInput'
import { InputProps } from '@lib/ui/props'

type GoalFormFieldsProps = InputProps<GoalFormShape> & {
  onSubmit: () => void
}

export const GoalFormFields = ({
  value,
  onChange,
  onSubmit,
}: GoalFormFieldsProps) => {
  return (
    <>
      <EmojiTextInputFrame>
        <div>
          <EmojiInput
            value={value.emoji}
            onChange={(emoji) => onChange({ ...value, emoji })}
          />
        </div>
        <EmbeddedTitleInput
          placeholder="Describe your goal"
          autoFocus
          onChange={(name) => onChange({ ...value, name })}
          value={value.name}
          onSubmit={onSubmit}
        />
      </EmojiTextInputFrame>
      <VStack alignItems="start">
        <GoalStatusSelector
          value={value.status}
          onChange={(status) => onChange({ ...value, status })}
        />
      </VStack>
      <GoalDeadlineInput
        isRequired={value.status !== 'toDo'}
        value={value.deadlineAt}
        onChange={(deadlineAt) => onChange({ ...value, deadlineAt })}
      />
      <GoalTargetInput
        value={value.target}
        onChange={(target) => onChange({ ...value, target })}
      />
      <EmbeddedDescriptionInput
        label="Your plan"
        placeholder="How are you going to achieve this goal? What's your plan?"
        onChange={(plan) => onChange({ ...value, plan })}
        value={value.plan}
      />
      <GoalTaskFactoriesInput
        onChange={(taskFactories) => onChange({ ...value, taskFactories })}
        value={value.taskFactories}
      />
    </>
  )
}
