import { useCreateProjectMutation } from '@increaser/app/projects/api/useCreateProjectMutation'
import { Controller, useForm } from 'react-hook-form'
import { usePaletteColorOptions } from '@increaser/app/shared/hooks/usePaletteColorOptions'
import { getRandomElement } from '@lib/utils/array/getRandomElement'
import { ColorLabelInput } from '@lib/ui/inputs/ColorLabelInput'
import { EmojiInput } from '@increaser/app/ui/EmojiInput'
import { Project } from '@increaser/entities/Project'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { defaultEmojis } from '@increaser/ui/projects/EnhancedProject'
import { TextInput } from '@lib/ui/inputs/TextInput'
import { InputContainer } from '@lib/ui/inputs/InputContainer'
import { LabelText } from '@lib/ui/inputs/LabelText'
import { Panel } from '@lib/ui/panel/Panel'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { preventDefault } from '@lib/ui/utils/preventDefault'
import { Button } from '@lib/ui/buttons/Button'

type ProjectFormShape = Pick<Project, 'name' | 'emoji' | 'color'>

export const CreateProjectForm = () => {
  const { activeProjects } = useProjects()

  const { mutate: createProject } = useCreateProjectMutation()

  const { usedColors, defaultColorOption } =
    usePaletteColorOptions(activeProjects)

  const getDefaultValues = () => ({
    name: '',
    emoji: getRandomElement(defaultEmojis),
    color: defaultColorOption,
  })

  const { control, register, handleSubmit, reset } = useForm<ProjectFormShape>({
    mode: 'onSubmit',
    defaultValues: getDefaultValues(),
  })

  return (
    <InputContainer style={{ gap: 8 }} as="div">
      <LabelText size={16}>New project</LabelText>
      <Panel kind="secondary" style={{ width: 'fit-content' }}>
        <VStack
          gap={28}
          as="form"
          onSubmit={preventDefault(
            handleSubmit((project) => {
              createProject({
                ...project,
                allocatedMinutesPerWeek: 0,
              })
              reset(getDefaultValues())
            }),
          )}
        >
          <HStack alignItems="center" gap={12}>
            <InputContainer style={{ width: 'fit-content' }} as="div">
              <LabelText>Emoji</LabelText>
              <Controller
                control={control}
                name="emoji"
                render={({ field: { value, onChange } }) => (
                  <EmojiInput value={value} onChange={onChange} />
                )}
              />
            </InputContainer>
            <InputContainer style={{ width: 'fit-content' }} as="div">
              <LabelText>Color</LabelText>
              <Controller
                control={control}
                name="color"
                render={({ field: { value, onChange } }) => (
                  <ColorLabelInput
                    usedValues={new Set(usedColors)}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </InputContainer>
            <InputContainer style={{ width: 'fit-content' }}>
              <LabelText>Name</LabelText>
              <TextInput
                placeholder="Project name"
                autoComplete="off"
                {...register('name', { required: true })}
              />
            </InputContainer>
          </HStack>
          <Button kind="secondary" size="l">
            Create
          </Button>
        </VStack>
      </Panel>
    </InputContainer>
  )
}
