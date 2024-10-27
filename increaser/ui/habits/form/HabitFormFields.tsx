import { EmbeddedTitleInput } from '@lib/ui/inputs/EmbeddedTitleInput'
import {
  ClosableComponentProps,
  InputProps,
  SubmittableComponentProps,
} from '@lib/ui/props'
import { EmojiInput } from '../../form/emoji-input/EmojiInput'
import { PanelFormCloseButton } from '../../form/panel/PanelFormCloseButton'
import { HabitFormShape } from './HabitFormShape'
import { EmojiTextInputFrame } from '../../form/EmojiTextInputFrame'

type HabitFormFieldsProps = InputProps<HabitFormShape> &
  Partial<SubmittableComponentProps> &
  ClosableComponentProps

export const HabitFormFields = ({
  value,
  onChange,
  onSubmit,
  onClose,
}: HabitFormFieldsProps) => {
  return (
    <EmojiTextInputFrame>
      <div>
        <EmojiInput
          value={value.emoji}
          onChange={(emoji) => onChange({ ...value, emoji })}
        />
      </div>
      <EmbeddedTitleInput
        placeholder="Habit name"
        autoFocus
        onChange={(name) => onChange({ ...value, name })}
        value={value.name}
        onSubmit={onSubmit}
      />
      <PanelFormCloseButton onClick={onClose} />
    </EmojiTextInputFrame>
  )
}
