import { useCallback, useState } from 'react'
import { getId } from '@increaser/entities-utils/shared/getId'
import { otherProject } from '@increaser/entities/Project'
import { TaskTemplate } from '@increaser/entities/TaskTemplate'
import { TaskLinksInput } from '../../tasks/form/TaskLinksInput'
import { TaskChecklistInput } from '../../tasks/form/checklist/TaskChecklistInput'
import { CreateFormFooter } from '@lib/ui/form/components/CreateFormFooter'
import { FinishableComponentProps } from '@lib/ui/props'
import { useIsTaskTemplateFormDisabled } from './useIsTaskTemplateFormDisabled'
import { TaskTemplateFormShape } from './TaskTemplateFormShape'
import { useCreateUserEntityMutation } from '../../userEntity/api/useCreateUserEntityMutation'
import { ListItemForm } from '../../form/ListItemForm'
import { TaskFormHeader } from '../../tasks/form/TaskFormHeader'

export const CreateTaskTemplateForm = ({
  onFinish,
}: FinishableComponentProps) => {
  const [value, setValue] = useState<TaskTemplateFormShape>({
    name: '',
    projectId: otherProject.id,
    links: [],
    checklist: [],
    description: '',
  })
  const { mutate, isPending } = useCreateUserEntityMutation('taskTemplate')

  const isDisabled = useIsTaskTemplateFormDisabled(value)

  const onSubmit = useCallback(() => {
    const taskTemplate: TaskTemplate = {
      id: getId(),
      ...value,
    }
    mutate(taskTemplate)
    onFinish()
  }, [mutate, onFinish, value])

  return (
    <ListItemForm
      onClose={onFinish}
      onSubmit={onSubmit}
      isDisabled={isDisabled}
    >
      <TaskFormHeader
        value={value}
        onChange={(value) => setValue((prev) => ({ ...prev, ...value }))}
        hasProjectAutoFocus
        onSubmit={isDisabled ? undefined : onSubmit}
      />
      <TaskLinksInput
        value={value.links}
        onChange={(links) => setValue((prev) => ({ ...prev, links }))}
      />
      <TaskChecklistInput
        value={value.checklist}
        onChange={(checklist) => setValue((prev) => ({ ...prev, checklist }))}
      />
      <CreateFormFooter
        isPending={isPending}
        isDisabled={isDisabled}
        onCancel={() => {
          onFinish()
        }}
      />
    </ListItemForm>
  )
}
