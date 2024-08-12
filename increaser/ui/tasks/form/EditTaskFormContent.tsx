import { useState } from 'react'
import { Task } from '@increaser/entities/Task'
import { VStack } from '@lib/ui/layout/Stack'
import { TaskProjectSelector } from '../TaskProjectSelector'
import { useCurrentTask } from '../CurrentTaskProvider'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { TaskDeadlineInput } from '../TaskDeadlineInput'
import { useIsTaskFormDisabled } from './useIsTaskFormDisabled'
import { TaskFormShape } from './TaskFormShape'
import { TaskLinksInput } from './TaskLinksInput'
import { fixLinks } from './fixLinks'
import { fixChecklist } from './checklist/fixChecklist'
import { TaskChecklistInput } from './checklist/TaskChecklistInput'
import { FinishableComponentProps } from '@lib/ui/props'
import { EmojiTextInputFrame } from '../../form/EmojiTextInputFrame'
import { EmbeddedTitleInput } from '@lib/ui/inputs/EmbeddedTitleInput'
import { TaskDescriptionInput } from './TaskDescriptionInput'
import { pick } from '@lib/utils/record/pick'
import { getUpdatedValues } from '@lib/utils/record/getUpdatedValues'
import { useUpdateUserEntityMutation } from '../../userEntity/api/useUpdateUserEntityMutation'
import { useDeleteUserEntityMutation } from '../../userEntity/api/useDeleteUserEntityMutation'
import { EditDeleteFormFooter } from '@lib/ui/form/components/EditDeleteFormFooter'
import { ListItemForm } from '../../form/ListItemForm'
import { TaskViewInput } from './TaskViewInput'

type EditTaskFormContentProps = FinishableComponentProps

type EditTaskFormShape = TaskFormShape & {
  completedAt?: number | null
}

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
    'completedAt',
  ])
  const [value, setValue] = useState<EditTaskFormShape>(initialValue)

  const { mutate: updateTask } = useUpdateUserEntityMutation('task')
  const { mutate: deleteTask } = useDeleteUserEntityMutation('task')

  const isDisabled = useIsTaskFormDisabled(value)

  const onSubmit = () => {
    if (isDisabled) {
      return
    }

    const newFields: Partial<Omit<Task, 'id'>> = getUpdatedValues(
      initialValue,
      {
        ...value,
        links: fixLinks(value.links),
        checklist: fixChecklist(value.checklist),
      },
    )
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
      <EmojiTextInputFrame>
        <div>
          <TaskProjectSelector
            value={value.projectId}
            onChange={(projectId) =>
              setValue((prev) => ({ ...prev, projectId }))
            }
          />
        </div>

        <EmbeddedTitleInput
          autoFocus
          placeholder="Task name"
          value={value.name}
          onChange={(name) => setValue((prev) => ({ ...prev, name }))}
          onSubmit={onSubmit}
        />
      </EmojiTextInputFrame>
      <TaskDescriptionInput
        value={value.description}
        onChange={(description) =>
          setValue((prev) => ({ ...prev, description }))
        }
      />
      <TaskLinksInput
        value={value.links}
        onChange={(links) => setValue((prev) => ({ ...prev, links }))}
      />
      <TaskChecklistInput
        value={value.checklist}
        onChange={(checklist) => setValue((prev) => ({ ...prev, checklist }))}
      />
      <VStack>
        <TaskViewInput
          value={value.completedAt ? 'done' : value.status}
          onChange={(status) =>
            setValue((prev) => {
              if (status === 'done') {
                return { ...prev, completedAt: Date.now() }
              }
              return { ...prev, status, completedAt: null }
            })
          }
        />
        <TaskDeadlineInput
          value={value.deadlineAt}
          onChange={(deadlineAt) =>
            setValue((prev) => ({ ...prev, deadlineAt }))
          }
        />
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
