import { Controller, useForm } from 'react-hook-form'
import { usePaletteColorOptions } from '@increaser/app/shared/hooks/usePaletteColorOptions'
import { FinishableComponentProps } from '@lib/ui/props'
import { Button } from '@lib/ui/buttons/Button'
import { ColorLabelInput } from '@lib/ui/inputs/ColorLabelInput'
import { HStack, VStack } from '@lib/ui/layout/Stack'

import { useCurrentProject } from '@increaser/ui/projects/CurrentProjectProvider'
import { EmojiInput } from '@increaser/app/ui/EmojiInput'
import { MinimalisticTextInput } from '@increaser/app/ui/MinimalisticTextInput'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { EnhancedProject } from '@increaser/ui/projects/EnhancedProject'
import { useUpdateProjectMutation } from '@increaser/ui/projects/api/useUpdateProjectMutation'

type ProjectFormShape = Pick<EnhancedProject, 'name' | 'emoji' | 'color'>

export const EditProject = ({ onFinish }: FinishableComponentProps) => {
  const { id, name, emoji, color } = useCurrentProject()
  const { activeProjects } = useProjects()

  const { mutate: updateProject } = useUpdateProjectMutation()

  const { usedColors } = usePaletteColorOptions(
    activeProjects.filter((project) => project.id !== id),
  )

  const { control, register, handleSubmit } = useForm<ProjectFormShape>({
    mode: 'onSubmit',
    defaultValues: {
      name: name,
      emoji,
      color,
    },
  })

  return (
    <VStack gap={20}>
      <HStack
        fullWidth
        justifyContent="space-between"
        wrap="wrap"
        alignItems="center"
        gap={20}
      >
        <HStack wrap="wrap" alignItems="center" gap={8}>
          <Controller
            control={control}
            name="emoji"
            render={({ field: { value, onChange } }) => (
              <EmojiInput value={value} onChange={onChange} />
            )}
          />
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
          <MinimalisticTextInput
            placeholder="Project name"
            {...register('name', { required: true })}
          />
        </HStack>
        <Button
          size="l"
          style={{ flex: 1 }}
          kind="reversed"
          onClick={handleSubmit((fields) => {
            updateProject({
              id,
              fields,
            })
            onFinish()
          })}
        >
          Update
        </Button>
      </HStack>
    </VStack>
  )
}
