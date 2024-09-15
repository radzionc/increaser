import { VisionAttributeFormShape } from './VisionAttributeFormShape'
import { EmojiTextInputFrame } from '../../form/EmojiTextInputFrame'
import { EmbeddedTitleInput } from '@lib/ui/inputs/EmbeddedTitleInput'
import { EmbeddedDescriptionInput } from '@lib/ui/inputs/EmbeddedDescriptionInput'
import { ClosableComponentProps, InputProps } from '@lib/ui/props'
import { EmojiInput } from '../../form/emoji-input/EmojiInput'
import { VisionImageInput } from './VisionImageInput'
import { PanelFormCloseButton } from '../../form/panel/PanelFormCloseButton'

type VisionAttributeFormFieldsProps = InputProps<VisionAttributeFormShape> & {
  onSubmit?: () => void
} & ClosableComponentProps

export const VisionAttributeFormFields = ({
  value,
  onChange,
  onSubmit,
  onClose,
}: VisionAttributeFormFieldsProps) => {
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
          autoFocus
          placeholder="What is your aspiration?"
          onChange={(name) => onChange({ ...value, name })}
          value={value.name}
          onSubmit={onSubmit}
        />
        <PanelFormCloseButton onClick={onClose} />
      </EmojiTextInputFrame>
      <EmbeddedDescriptionInput
        label="Description"
        placeholder="Make your aspiration more specific"
        onChange={(description) =>
          onChange({ ...value, description: description || null })
        }
        value={value.description ?? ''}
      />
      <VisionImageInput
        onChange={(imageId) => onChange({ ...value, imageId })}
        value={value.imageId ?? null}
      />
    </>
  )
}
