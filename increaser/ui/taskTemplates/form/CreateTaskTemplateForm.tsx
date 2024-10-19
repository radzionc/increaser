import { useCallback, useState } from 'react'
import { getId } from '@increaser/entities-utils/shared/getId'
import { otherProject } from '@increaser/entities/Project'
import { TaskTemplate } from '@increaser/entities/TaskTemplate'
import { CreateFormFooter } from '@lib/ui/form/components/CreateFormFooter'
import {
  ComponentWithInitialValueProps,
  OptionalValueFinishProps,
} from '@lib/ui/props'
import { useIsTaskTemplateFormDisabled } from './useIsTaskTemplateFormDisabled'
import { TaskTemplateFormShape } from './TaskTemplateFormShape'
import { useCreateUserEntityMutation } from '../../userEntity/api/useCreateUserEntityMutation'
import { ListItemForm } from '../../form/ListItemForm'
import { TaskFormHeader } from '../../tasks/form/TaskFormHeader'
import { HStack } from '@lib/ui/css/stack'
import { AddTaskLink } from '../../tasks/form/links/AddTaskLink'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { AddTaskChecklist } from '../../tasks/form/checklist/AddTaskChecklist'
import { TaskTemplatesWidget } from '../widget/TaskTemplatesWidget'

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
        hasProjectAutoFocus={!initialValue?.projectId}
      />
      <HStack
        wrap="wrap"
        fullWidth
        alignItems="center"
        gap={20}
        justifyContent="space-between"
      >
        <HStack gap={8}>
          <AddTaskLink
            onFinish={(link) =>
              setValue((prev) => ({ ...prev, links: [...prev.links, link] }))
            }
          />

          <TaskTemplatesWidget
            onChange={(template) =>
              setValue((prev) => ({ ...prev, ...template }))
            }
            value={value}
          />

          {isEmpty(value.checklist) && (
            <AddTaskChecklist
              onFinish={(checklist) =>
                setValue((prev) => ({
                  ...prev,
                  checklist,
                }))
              }
            />
          )}
        </HStack>
        <CreateFormFooter
          isPending={isPending}
          isDisabled={isDisabled}
          onCancel={() => {
            onFinish?.()
          }}
        />
      </HStack>
    </ListItemForm>
  )
}
