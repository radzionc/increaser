import { usePaletteColorOptions } from '@increaser/app/shared/hooks/usePaletteColorOptions'
import { ColorLabelInput } from '@lib/ui/inputs/ColorLabelInput'
import { EmojiInput } from '@increaser/app/ui/EmojiInput'
import { TextInput } from '@lib/ui/inputs/TextInput'
import { InputContainer } from '@lib/ui/inputs/InputContainer'
import { LabelText } from '@lib/ui/inputs/LabelText'
import { HStack } from '@lib/ui/layout/Stack'
import { InputProps } from '@lib/ui/props'
import { ProjectFields } from './ProjectFields'
import { useActiveProjects } from '@increaser/ui/projects/hooks/useActiveProjects'

type ProjectFormFieldsProps = InputProps<ProjectFields>

export const ProjectFormFields = ({
  value,
  onChange,
}: ProjectFormFieldsProps) => {
  const activeProjects = useActiveProjects()

  const { usedColors } = usePaletteColorOptions(activeProjects)

  return (
    <HStack alignItems="center" gap={12}>
      <InputContainer style={{ width: 'fit-content' }} as="div">
        <LabelText>Emoji</LabelText>
        <EmojiInput
          value={value.emoji}
          onChange={(emoji) => onChange({ ...value, emoji })}
        />
      </InputContainer>
      <InputContainer style={{ width: 'fit-content' }} as="div">
        <LabelText>Color</LabelText>
        <ColorLabelInput
          usedValues={new Set(usedColors)}
          value={value.color}
          onChange={(color) => onChange({ ...value, color })}
        />
      </InputContainer>
      <InputContainer>
        <LabelText>Name</LabelText>
        <TextInput
          autoFocus
          placeholder="Project name"
          autoComplete="off"
          value={value.name}
          onValueChange={(name) => onChange({ ...value, name })}
        />
      </InputContainer>
    </HStack>
  )
}
