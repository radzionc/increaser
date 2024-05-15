import { useCreateProjectMutation } from '@increaser/app/projects/api/useCreateProjectMutation'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { InputContainer } from '@lib/ui/inputs/InputContainer'
import { LabelText } from '@lib/ui/inputs/LabelText'
import { Panel } from '@lib/ui/panel/Panel'
import { VStack } from '@lib/ui/layout/Stack'
import { Button } from '@lib/ui/buttons/Button'
import { useState } from 'react'
import { ProjectFields } from '../../projects/components/ProjectForm/ProjectFields'
import { getProjectDefaultFields } from '../../projects/components/ProjectForm/getProjectDefaultFields'
import { useIsProjectFormDisabled } from '../../projects/components/ProjectForm/useIsProjectFormDisabled'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { ProjectFormFields } from '../../projects/components/ProjectForm/ProjectFormFields'

export const CreateProjectForm = () => {
  const { activeProjects } = useProjects()

  const { mutate: createProject } = useCreateProjectMutation()

  const [value, setValue] = useState<ProjectFields>(() =>
    getProjectDefaultFields({
      projects: activeProjects,
    }),
  )

  const isDisabled = useIsProjectFormDisabled(value)

  return (
    <InputContainer style={{ gap: 8 }} as="div">
      <LabelText>New project</LabelText>
      <Panel kind="secondary" style={{ width: '100%' }}>
        <VStack
          gap={28}
          as="form"
          {...getFormProps({
            isDisabled,
            onSubmit: () => {
              createProject({
                ...value,
                allocatedMinutesPerWeek: 0,
                workingDays: 'everyday',
              })
              setValue(getProjectDefaultFields({ projects: activeProjects }))
            },
          })}
        >
          <ProjectFormFields value={value} onChange={setValue} />
          <Button kind="secondary" size="l">
            Create
          </Button>
        </VStack>
      </Panel>
    </InputContainer>
  )
}
