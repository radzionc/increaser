import { useState } from 'react'
import { HStack, VStack } from '@lib/ui/css/stack'
import { useCurrentTask } from '../CurrentTaskProvider'
import { TaskDeadlineInput } from '../deadline/TaskDeadlineInput'
import { useIsTaskFormDisabled } from './useIsTaskFormDisabled'
import { TaskFormShape } from './TaskFormShape'
import { fixLinks } from './fixLinks'
import { fixChecklist } from './checklist/fixChecklist'
import { NoValueFinishProps } from '@lib/ui/props'
import { pick } from '@lib/utils/record/pick'
import { getUpdatedValues } from '@lib/utils/record/getUpdatedValues'
import { useUpdateUserEntityMutation } from '../../userEntity/api/useUpdateUserEntityMutation'
import { useDeleteUserEntityMutation } from '../../userEntity/api/useDeleteUserEntityMutation'
import { EditDeleteFormFooter } from '@lib/ui/form/components/EditDeleteFormFooter'
import { ListItemForm } from '../../form/ListItemForm'
import { TaskStatusInput } from './TaskStatusInput'
import { TaskFormHeader } from './TaskFormHeader'
import { AddTaskLink } from './links/AddTaskLink'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { AddTaskChecklist } from './checklist/AddTaskChecklist'

type EditTaskFormContentProps = NoValueFinishProps

export const EditTaskFormContent = ({ onFinish }: EditTaskFormContentProps) => {
  const task = useCurrentTask()
  const initialValue = pick(task, [
    'name',
    'projectId',
    'links',
    'checklist',
    'description',
    'deadlineAt',
    'status',
  ])
  const [value, setValue] = useState<TaskFormShape>(initialValue)

  const { mutate: updateTask } = useUpdateUserEntityMutation('task')
  const { mutate: deleteTask } = useDeleteUserEntityMutation('task')

  const isDisabled = useIsTaskFormDisabled(value)

  const onSubmit = () => {
    const fields = getUpdatedValues({
      before: initialValue,
      after: {
        ...value,
        links: fixLinks(value.links),
        checklist: fixChecklist(value.checklist),
      },
    })

    if (fields) {
      updateTask({
        id: task.id,
        fields,
      })
    }

    onFinish()
  }

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
      />
      <VStack>
        <HStack alignItems="center" gap={8}>
          <TaskStatusInput
            value={value.status}
            onChange={(status) => setValue((prev) => ({ ...prev, status }))}
          />
          <TaskDeadlineInput
            value={value.deadlineAt}
            onChange={(deadlineAt) =>
              setValue((prev) => ({ ...prev, deadlineAt }))
            }
          />
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
      </VStack>

      <EditDeleteFormFooter
        onDelete={() => {
          deleteTask(task.id)
          onFinish()
        }}
        onCancel={onFinish}
        isDisabled={isDisabled}
      />
    </ListItemForm>
  )
}
