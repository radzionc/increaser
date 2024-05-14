import { usePaletteColorOptions } from '@increaser/app/shared/hooks/usePaletteColorOptions'
import { ColorLabelInput } from '@lib/ui/inputs/ColorLabelInput'
import { EmojiInput } from '@increaser/app/ui/EmojiInput'
import { Project } from '@increaser/entities/Project'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { TextInput } from '@lib/ui/inputs/TextInput'
import { InputContainer } from '@lib/ui/inputs/InputContainer'
import { LabelText } from '@lib/ui/inputs/LabelText'
import { HStack } from '@lib/ui/layout/Stack'
import { InputProps } from '@lib/ui/props'

type ProjectFormFieldsProps = InputProps<
  Pick<Project, 'name' | 'emoji' | 'color'>
>

export const ProjectFormFields = ({
  value,
  onChange,
}: ProjectFormFieldsProps) => {
  const { activeProjects } = useProjects()

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
