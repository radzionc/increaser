import { EmbeddedTitleInput } from '@lib/ui/inputs/EmbeddedTitleInput'
import {
  ClosableComponentProps,
  InputProps,
  SubmittableComponentProps,
} from '@lib/ui/props'
import { EmojiInput } from '../../form/emoji-input/EmojiInput'
import { PanelFormCloseButton } from '../../form/panel/PanelFormCloseButton'
import { EmojiColorTextInputFrame } from '../../form/EmojiColorTextInputFrame'
import { ColorLabelInput } from '@lib/ui/inputs/ColorLabelInput'
import { HabitFormShape } from './HabitFormShape'
import { useHabits } from '../HabitsContext'

type HabitFormFieldsProps = InputProps<HabitFormShape> &
  Partial<SubmittableComponentProps> &
  ClosableComponentProps

export const HabitFormFields = ({
  value,
  onChange,
  onSubmit,
  onClose,
}: HabitFormFieldsProps) => {
  const { habits } = useHabits()
  const usedColors = habits.map(({ color }) => color)

  return (
    <EmojiColorTextInputFrame>
      <div>
        <EmojiInput
          value={value.emoji}
          onChange={(emoji) => onChange({ ...value, emoji })}
        />
      </div>
      <div>
        <ColorLabelInput
          usedValues={new Set(usedColors)}
          value={value.color}
          onChange={(color) => onChange({ ...value, color })}
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
    </EmojiColorTextInputFrame>
  )
}
