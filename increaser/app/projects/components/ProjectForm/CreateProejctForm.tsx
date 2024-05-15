import { useCreateProjectMutation } from '@increaser/app/projects/api/useCreateProjectMutation'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { InputContainer } from '@lib/ui/inputs/InputContainer'
import { LabelText } from '@lib/ui/inputs/LabelText'
import { Panel } from '@lib/ui/panel/Panel'
import { VStack } from '@lib/ui/layout/Stack'
import { useState } from 'react'
import { FinishableComponentProps } from '@lib/ui/props'
import { ProjectFormFields } from './ProjectFormFields'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { ProjectFields } from './ProjectFields'
import { getProjectDefaultFields } from './getProjectDefaultFields'
import { useIsProjectFormDisabled } from './useIsProjectFormDisabled'
import { FormActions } from '@lib/ui/form/components/FormActions'

export const CreateProjectForm = ({ onFinish }: FinishableComponentProps) => {
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
      <Panel kind="secondary">
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
          <FormActions isDisabled={isDisabled} onCancel={onFinish} />
        </VStack>
      </Panel>
    </InputContainer>
  )
}
