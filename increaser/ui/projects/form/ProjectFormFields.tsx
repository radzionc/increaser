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
import { useActiveProjects } from '../hooks/useActiveProjects'

type ProjectFields = {
  name: string
  emoji: string
  color: number
}

type ProjectFormFieldsProps = InputProps<ProjectFields> &
  Partial<SubmittableComponentProps> &
  ClosableComponentProps

export const ProjectFormFields = ({
  value,
  onChange,
  onSubmit,
  onClose,
}: ProjectFormFieldsProps) => {
  const activeProjects = useActiveProjects()
  const usedColors = Object.values(activeProjects).map(({ color }) => color)

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
        placeholder="Project name"
        autoFocus
        onChange={(name) => onChange({ ...value, name })}
        value={value.name}
        onSubmit={onSubmit}
      />
      <PanelFormCloseButton onClick={onClose} />
    </EmojiColorTextInputFrame>
  )
}
