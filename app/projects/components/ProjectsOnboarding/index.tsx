import { useCreateProjectsMutation } from 'projects/api/useCreateProjectsMutation'
import { EnhancedProject, defaultEmojis } from 'projects/Project'
import { useEffect } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { usePaletteColorOptions } from 'shared/hooks/usePaletteColorOptions'
import { getRandomElement } from '@increaser/utils/array/getRandomElement'
import { ColorLabelInput } from '@increaser/ui/ui/inputs/ColorLabelInput'
import { Line } from '@increaser/ui/ui/Line'
import { Modal } from '@increaser/ui/modal'
import { HStack, VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { ContinueButton } from 'ui/ContinueButton'
import { EmojiInput } from 'ui/EmojiInput'
import { MinimalisticTextInput } from 'ui/MinimalisticTextInput'
import { ClosableComponentProps } from '@increaser/ui/props'
import { productName } from '@increaser/entities'

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
