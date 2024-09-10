import { useCallback, useState } from 'react'
import { getId } from '@increaser/entities-utils/shared/getId'
import { otherProject } from '@increaser/entities/Project'
import { TaskTemplate } from '@increaser/entities/TaskTemplate'
import { CreateFormFooter } from '@lib/ui/form/components/CreateFormFooter'
import { NoValueFinishProps } from '@lib/ui/props'
import { useIsTaskTemplateFormDisabled } from './useIsTaskTemplateFormDisabled'
import { TaskTemplateFormShape } from './TaskTemplateFormShape'
import { useCreateUserEntityMutation } from '../../userEntity/api/useCreateUserEntityMutation'
import { ListItemForm } from '../../form/ListItemForm'
import { TaskFormHeader } from '../../tasks/form/TaskFormHeader'
import { HStack } from '@lib/ui/css/stack'
import { AddTaskLink } from '../../tasks/form/links/AddTaskLink'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { AddTaskChecklist } from '../../tasks/form/checklist/AddTaskChecklist'

export const CreateTaskTemplateForm = ({ onFinish }: NoValueFinishProps) => {
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
            onFinish()
          }}
        />
      </HStack>
    </ListItemForm>
  )
}
