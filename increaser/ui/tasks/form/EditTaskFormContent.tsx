import { useState } from 'react'
import { Task } from '@increaser/entities/Task'
import { HStack, VStack } from '@lib/ui/css/stack'
import { useCurrentTask } from '../CurrentTaskProvider'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { TaskDeadlineInput } from '../deadline/TaskDeadlineInput'
import { useIsTaskFormDisabled } from './useIsTaskFormDisabled'
import { TaskFormShape } from './TaskFormShape'
import { fixLinks } from './fixLinks'
import { fixChecklist } from './checklist/fixChecklist'
import { TaskChecklistInput } from './checklist/TaskChecklistInput'
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

type EditTaskFormContentProps = NoValueFinishProps

export const EditTaskFormContent = ({ onFinish }: EditTaskFormContentProps) => {
  const { tasks } = useAssertUserState()
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
    const newFields: Partial<Omit<Task, 'id'>> = getUpdatedValues({
      before: initialValue,
      after: {
        ...value,
        links: fixLinks(value.links),
        checklist: fixChecklist(value.checklist),
      },
    })

    if (value.deadlineAt !== task.deadlineAt) {
      const orders = Object.values(tasks).map((task) => task.order)
      newFields.order = getLastItemOrder(orders)
    }

    updateTask({
      id: task.id,
      fields: newFields,
    })
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
      <TaskChecklistInput
        value={value.checklist}
        onChange={(checklist) => setValue((prev) => ({ ...prev, checklist }))}
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
