import { useState } from 'react'
import { DeadlineStatus, Task } from '@increaser/entities/Task'
import { getDeadlineAt } from '@increaser/entities-utils/task/getDeadlineAt'
import { TaskNameInput } from '../TaskNameInput'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { TaskProjectSelector } from '../TaskProjectSelector'
import { Button } from '@lib/ui/buttons/Button'
import { useCurrentTask } from '../CurrentTaskProvider'
import { useUpdateTaskMutation } from '@increaser/ui/tasks/api/useUpdateTaskMutation'
import { getDeadlineStatus } from '@increaser/entities-utils/task/getDeadlineStatus'
import { groupItems } from '@lib/utils/array/groupItems'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { TaskDeadlineInput } from '../TaskDeadlineInput'
import { useDeleteTaskMutation } from '../api/useDeleteTaskMutation'
import { useIsTaskFormDisabled } from './useIsTaskFormDisabled'
import { TaskFormShape } from './TaskFormShape'
import { TaskLinksInput } from './TaskLinksInput'
import { fixLinks } from './fixLinks'
import { fixChecklist } from './checklist/fixChecklist'
import { TaskChecklistInput } from './checklist/TaskChecklistInput'
import { FinishableComponentProps, UIComponentProps } from '@lib/ui/props'
import { Panel } from '@lib/ui/panel/Panel'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'

type EditTaskFormContentProps = FinishableComponentProps & UIComponentProps

export const EditTaskFormContent = ({
  onFinish,
  ...rest
}: EditTaskFormContentProps) => {
  const { tasks } = useAssertUserState()
  const task = useCurrentTask()
  const [value, setValue] = useState<TaskFormShape>({
    name: task.name,
    projectId: task.projectId,
    links: task.links ?? [],
    checklist: task.checklist ?? [],
  })
  const currentDeadlineStatus = getDeadlineStatus({
    now: Date.now(),
    deadlineAt: task.deadlineAt,
  })
  const [deadlineStatus, setDeadlineStatus] = useState<DeadlineStatus>(
    currentDeadlineStatus,
  )

  const { mutate: updateTask } = useUpdateTaskMutation()
  const { mutate: deleteTask } = useDeleteTaskMutation()

  const isDisabled = useIsTaskFormDisabled(value)

  const onSubmit = () => {
    if (isDisabled) {
      return
    }

    const fields: Partial<Omit<Task, 'id'>> = {}
    if (value.name !== task.name) {
      fields.name = value.name
    }
    if (value.projectId !== task.projectId) {
      fields.projectId = value.projectId
    }
    const newLinks = fixLinks(value.links)
    if (newLinks !== task.links) {
      fields.links = newLinks
    }

    const newChecklist = fixChecklist(value.checklist)
    if (newChecklist !== task.checklist) {
      fields.checklist = newChecklist
    }

    if (
      deadlineStatus !== currentDeadlineStatus &&
      deadlineStatus !== 'overdue'
    ) {
      const now = Date.now()

      const deadlineAt =
        deadlineStatus === 'none'
          ? null
          : getDeadlineAt({
              now,
              deadlineType: deadlineStatus,
            })

      const groupedTasks = groupItems(
        Object.values(tasks).filter((task) => !task.completedAt),
        (task) =>
          getDeadlineStatus({
            deadlineAt: task.deadlineAt,
            now,
          }),
      )

      fields.deadlineAt = deadlineAt
      fields.order = getLastItemOrder(
        (groupedTasks[deadlineStatus] ?? []).map((task) => task.order),
      )
    }

    updateTask({
      id: task.id,
      fields,
    })
    onFinish()
  }

  return (
    <Panel
      as="form"
      {...getFormProps({
        onClose: onFinish,
        isDisabled,
        onSubmit,
      })}
      withSections
      kind="secondary"
      {...rest}
    >
      <TaskNameInput
        placeholder="Task name"
        autoFocus
        onChange={(name) => setValue((prev) => ({ ...prev, name }))}
        value={value.name}
        onSubmit={onSubmit}
      />
      <TaskLinksInput
        value={value.links}
        onChange={(links) => setValue((prev) => ({ ...prev, links }))}
      />
      <TaskChecklistInput
        value={value.checklist}
        onChange={(checklist) => setValue((prev) => ({ ...prev, checklist }))}
      />
      <VStack gap={28}>
        <HStack alignItems="center" gap={8}>
          <TaskProjectSelector
            value={value.projectId}
            onChange={(projectId) =>
              setValue((prev) => ({ ...prev, projectId }))
            }
          />
          <TaskDeadlineInput
            value={deadlineStatus}
            onChange={setDeadlineStatus}
          />
        </HStack>
      </VStack>

      <HStack
        wrap="wrap"
        justifyContent="space-between"
        fullWidth
        alignItems="center"
        gap={20}
      >
        <Button
          kind="alert"
          type="button"
          onClick={() => {
            deleteTask({ id: task.id })
            onFinish()
          }}
        >
          Delete
        </Button>
        <HStack alignItems="center" gap={8}>
          <Button type="button" onClick={onFinish} kind="secondary">
            Cancel
          </Button>
          <Button isDisabled={isDisabled}>Save</Button>
        </HStack>
      </HStack>
    </Panel>
  )
}
