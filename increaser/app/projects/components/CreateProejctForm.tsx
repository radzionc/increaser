import { useCreateProjectMutation } from '@increaser/app/projects/api/useCreateProjectMutation'
import { getRandomElement } from '@lib/utils/array/getRandomElement'
import { Project } from '@increaser/entities/Project'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { defaultEmojis } from '@increaser/ui/projects/EnhancedProject'
import { InputContainer } from '@lib/ui/inputs/InputContainer'
import { LabelText } from '@lib/ui/inputs/LabelText'
import { Panel } from '@lib/ui/panel/Panel'
import { VStack } from '@lib/ui/layout/Stack'
import { Button } from '@lib/ui/buttons/Button'
import { suggestLabelColor } from '@lib/ui/theme/suggestLabelColor'
import { useMemo, useState } from 'react'
import { FinishableComponentProps } from '@lib/ui/props'
import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'
import { ProjectFormFields } from './ProjectFormFields'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'

export const CreateProjectForm = ({ onFinish }: FinishableComponentProps) => {
  const { activeProjects } = useProjects()

  const { mutate: createProject } = useCreateProjectMutation()

  const [value, setValue] = useState<Pick<Project, 'name' | 'emoji' | 'color'>>(
    () => ({
      name: '',
      emoji: getRandomElement(defaultEmojis),
      color: suggestLabelColor({
        used: activeProjects.map((project) => project.color),
      }),
    }),
  )

  const isDisabled = useMemo(() => {
    if (!value.name) {
      return 'Name is required'
    }
  }, [value.name])

  return (
    <InputContainer style={{ gap: 8 }} as="div">
      <LabelText size={16}>New project</LabelText>
      <Panel kind="secondary" style={{ width: '100%' }}>
        <VStack
          gap={28}
          as="form"
          {...getFormProps({
            onClose: onFinish,
            isDisabled,
            onSubmit: () => {
              createProject({
                ...value,
                allocatedMinutesPerWeek: 0,
                workingDays: 'everyday',
              })
              onFinish()
            },
          })}
        >
          <ProjectFormFields value={value} onChange={setValue} />
          <UniformColumnGrid gap={20}>
            <Button type="button" kind="secondary" size="l" onClick={onFinish}>
              Cancel
            </Button>
            <Button isDisabled={isDisabled} size="l">
              Create
            </Button>
          </UniformColumnGrid>
        </VStack>
      </Panel>
    </InputContainer>
  )
}
