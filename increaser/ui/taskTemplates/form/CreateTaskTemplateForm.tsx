import { useCallback, useState } from 'react'
import { getId } from '@increaser/entities-utils/shared/getId'
import { otherProject } from '@increaser/entities/Project'
import { TaskTemplate } from '@increaser/entities/TaskTemplate'
import { CancelSubmitFormFooter } from '@lib/ui/form/components/CancelSubmitFormFooter'
import {
  ComponentWithInitialValueProps,
  OptionalValueFinishProps,
} from '@lib/ui/props'
import { useIsTaskTemplateFormDisabled } from './useIsTaskTemplateFormDisabled'
import { TaskTemplateFormShape } from './TaskTemplateFormShape'
import { useCreateUserEntityMutation } from '../../userEntity/api/useCreateUserEntityMutation'
import { ListItemForm } from '../../form/ListItemForm'
import { TaskFormHeader } from '../../tasks/form/TaskFormHeader'

export const CreateTaskTemplateForm: React.FC<
  Partial<ComponentWithInitialValueProps<Partial<TaskTemplateFormShape>>> &
    Partial<OptionalValueFinishProps<TaskTemplate>>
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
