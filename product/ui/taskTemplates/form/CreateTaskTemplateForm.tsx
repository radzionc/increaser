import { CancelSubmitFormFooter } from '@lib/ui/form/components/CancelSubmitFormFooter'
import { InitialValueProp, OnFinishProp } from '@lib/ui/props'
import { otherProject } from '@product/entities/Project'
import { TaskTemplate } from '@product/entities/TaskTemplate'
import { getId } from '@product/entities-utils/shared/getId'
import { useCallback, useState } from 'react'

import { ListItemForm } from '../../form/ListItemForm'
import { TaskFormHeader } from '../../tasks/form/TaskFormHeader'
import { useCreateUserEntityMutation } from '../../userEntity/api/useCreateUserEntityMutation'

import { TaskTemplateFormShape } from './TaskTemplateFormShape'
import { useIsTaskTemplateFormDisabled } from './useIsTaskTemplateFormDisabled'

export const CreateTaskTemplateForm: React.FC<
  Partial<InitialValueProp<Partial<TaskTemplateFormShape>>> &
    Partial<OnFinishProp<TaskTemplate, 'optional'>>
> = ({ onFinish, initialValue }) => {
  const [value, setValue] = useState<TaskTemplateFormShape>({
    name: '',
    projectId: otherProject.id,
    links: [],
    checklist: [],
    description: '',
    ...initialValue,
  })
  const { mutate, isPending } = useCreateUserEntityMutation('taskTemplate', {
    onOptimisticUpdate: onFinish,
  })

  const isDisabled = useIsTaskTemplateFormDisabled(value)

  const onSubmit = useCallback(() => {
    const taskTemplate: TaskTemplate = {
      id: getId(),
      ...value,
    }
    mutate(taskTemplate)
  }, [mutate, value])

  return (
    <ListItemForm
      onClose={onFinish}
      onSubmit={onSubmit}
      isDisabled={isDisabled}
    >
      <TaskFormHeader
        value={value}
        onChange={(value) => setValue((prev) => ({ ...prev, ...value }))}
        onSubmit={isDisabled ? undefined : onSubmit}
        onClose={onFinish}
        hasProjectAutoFocus={!initialValue?.projectId}
      />
      <CancelSubmitFormFooter
        isPending={isPending}
        isDisabled={isDisabled}
        onCancel={() => {
          onFinish?.()
        }}
      />
    </ListItemForm>
  )
}
