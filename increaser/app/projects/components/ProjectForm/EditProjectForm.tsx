import { InputContainer } from '@lib/ui/inputs/InputContainer'
import { LabelText } from '@lib/ui/inputs/LabelText'
import { Panel } from '@lib/ui/panel/Panel'
import { VStack } from '@lib/ui/layout/Stack'
import { useState } from 'react'
import { FinishableComponentProps } from '@lib/ui/props'
import { useCurrentProject } from '@increaser/ui/projects/CurrentProjectProvider'
import { pick } from '@lib/utils/record/pick'
import { useUpdateProjectMutation } from '@increaser/ui/projects/api/useUpdateProjectMutation'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { useIsProjectFormDisabled } from './useIsProjectFormDisabled'
import { ProjectFields } from './ProjectFields'
import { ProjectFormFields } from './ProjectFormFields'
import { FormActions } from '@lib/ui/form/components/FormActions'

export const EditProjectForm = ({ onFinish }: FinishableComponentProps) => {
  const project = useCurrentProject()

  const { mutate: updateProject } = useUpdateProjectMutation()

  const [value, setValue] = useState<ProjectFields>(() =>
    pick(project, ['name', 'emoji', 'color']),
  )

  const isDisabled = useIsProjectFormDisabled(value)

  return (
    <InputContainer style={{ gap: 8 }} as="div">
      <LabelText>Edit project</LabelText>
      <Panel kind="secondary">
        <VStack
          gap={28}
          as="form"
          {...getFormProps({
            onClose: onFinish,
            isDisabled,
            onSubmit: () => {
              updateProject({
                id: project.id,
                fields: value,
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
