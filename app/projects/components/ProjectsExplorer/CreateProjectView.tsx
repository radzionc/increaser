import { useCreateProjectMutation } from 'projects/api/useCreateProjectMutation'
import { useProjects } from 'projects/hooks/useProjects'
import { defaultEmojis } from 'projects/Project'
import { useEffect, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { usePaletteColorOptions } from 'shared/hooks/usePaletteColorOptions'
import { getRandomElement } from '@increaser/utils/array/getRandomElement'
import { Button } from '@increaser/ui/ui/buttons/Button'
import { ColorLabelInput } from '@increaser/ui/ui/inputs/ColorLabelInput'
import { HStack, VStack } from '@increaser/ui/ui/Stack'

import { MinimalisticTextInput } from 'ui/MinimalisticTextInput'
import { EmojiInput } from 'ui/EmojiInput'
import { useRouter } from 'next/router'
import { getProjectPath } from 'router/Path'
import { Project } from '@increaser/entities/Project'

type ProjectFormShape = Pick<Project, 'name' | 'emoji' | 'color'>

export const CreateProjectView = () => {
  const { projectsRecord, activeProjects } = useProjects()

  const router = useRouter()

  const newProjectId = useRef<string>()
  const { mutate: createProject } = useCreateProjectMutation({
    onOptimisticUpdate: ({ id }) => (newProjectId.current = id),
  })

  const { usedColors, defaultColorOption } =
    usePaletteColorOptions(activeProjects)

  const { control, register, handleSubmit } = useForm<ProjectFormShape>({
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      emoji: getRandomElement(defaultEmojis),
      color: defaultColorOption,
    },
  })

  useEffect(() => {
    if (newProjectId.current && projectsRecord[newProjectId.current]) {
      router.push(getProjectPath(newProjectId.current))
    }
  }, [projectsRecord, router])

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
          onClick={handleSubmit((project) => {
            createProject({
              ...project,
              allocatedMinutesPerWeek: 0,
            })
          })}
        >
          Create
        </Button>
      </HStack>
    </VStack>
  )
}
