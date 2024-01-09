import { useCreateProjectsMutation } from '@increaser/app/projects/api/useCreateProjectsMutation'
import { useEffect } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { usePaletteColorOptions } from '@increaser/app/shared/hooks/usePaletteColorOptions'
import { getRandomElement } from '@lib/utils/array/getRandomElement'
import { ColorLabelInput } from '@lib/ui/inputs/ColorLabelInput'
import { Line } from '@lib/ui/layout/Line'
import { Modal } from '@lib/ui/modal'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { ContinueButton } from '@increaser/app/ui/ContinueButton'
import { EmojiInput } from '@increaser/app/ui/EmojiInput'
import { MinimalisticTextInput } from '@increaser/app/ui/MinimalisticTextInput'
import { ClosableComponentProps } from '@lib/ui/props'
import { productName } from '@increaser/entities'
import {
  EnhancedProject,
  defaultEmojis,
} from '@increaser/ui/projects/EnhancedProject'

interface Props extends ClosableComponentProps {
  onNext: () => void
  onBack: () => void
}

interface ProjectsSetupShape {
  projects: Pick<EnhancedProject, 'name' | 'emoji' | 'color'>[]
}

export const ProjectsOnboarding = ({ onNext, onClose }: Props) => {
  const { mutate: createProjects } = useCreateProjectsMutation()
  const { register, control, watch } = useForm<ProjectsSetupShape>({
    defaultValues: {
      projects: [{ name: '', emoji: defaultEmojis[0], color: 0 }],
    },
    mode: 'all',
  })

  const { fields, append } = useFieldArray({
    control,
    name: 'projects',
  })

  const { usedColors, defaultColorOption } = usePaletteColorOptions(fields)

  const projects = watch('projects')
  const validProjects = projects.filter((field) => field.name.length > 0)

  useEffect(() => {
    if (validProjects.length === projects.length) {
      append(
        {
          name: '',
          emoji: getRandomElement(defaultEmojis) ?? defaultEmojis[0],
          color: defaultColorOption,
        },
        {
          shouldFocus: false,
        },
      )
    }
  }, [append, defaultColorOption, projects.length, validProjects.length])

  return (
    <Modal
      onClose={onClose}
      placement="top"
      title={`What projects do you want to track with ${productName}?`}
      subTitle={
        <>
          <Text as="span" color="shy">
            For example:
          </Text>{' '}
          job, content creation, study, freelance, business, planning
        </>
      }
      footer={
        <ContinueButton
          isDisabled={validProjects.length < 1}
          onClick={() => {
            createProjects({ projects: validProjects })
            onNext()
          }}
        />
      }
    >
      <VStack gap={20}>
        <Line />
        {fields.map((field, index) => {
          return (
            <HStack key={index} wrap="wrap" alignItems="center" gap={8}>
              <Controller
                control={control}
                name={`projects.${index}.emoji`}
                render={({ field: { value, onChange } }) => (
                  <EmojiInput value={value} onChange={onChange} />
                )}
              />
              <Controller
                control={control}
                name={`projects.${index}.color`}
                render={({ field: { value, onChange } }) => (
                  <ColorLabelInput
                    usedValues={
                      new Set(usedColors.filter((color) => color !== index))
                    }
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              <MinimalisticTextInput
                placeholder="Project name"
                {...register(`projects.${index}.name`, { required: true })}
              />
            </HStack>
          )
        })}
      </VStack>
    </Modal>
  )
}
