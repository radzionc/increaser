import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { useKey } from 'react-use'
import { handleWithPreventDefault } from '@increaser/app/shared/events'
import { DeadlineStatus, Task } from '@increaser/entities/Task'
import { getDeadlineAt } from '@increaser/entities-utils/task/getDeadlineAt'
import { TaskNameInput } from './TaskNameInput'
import { Panel } from '@lib/ui/panel/Panel'
import { HStack } from '@lib/ui/layout/Stack'
import { TaskProjectSelector } from './TaskProjectSelector'
import { Button } from '@lib/ui/buttons/Button'
import { useCurrentTask } from './CurrentTaskProvider'
import { useUpdateTaskMutation } from '../api/useUpdateTaskMutation'
import { getDeadlineStatus } from '@increaser/entities-utils/task/getDeadlineStatus'
import { groupItems } from '@lib/utils/array/groupItems'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { useTasksManager } from './TasksManagerProvider'
import { TaskDeadlineInput } from './TaskDeadlineInput'

export const EditTaskForm = () => {
  const { tasks } = useAssertUserState()
  const task = useCurrentTask()
  const [name, setName] = useState(task.name)
  const [projectId, setProjectId] = useState<string | null>(
    task.projectId ?? null,
  )
  const currentDeadlineStatus = getDeadlineStatus({
    now: Date.now(),
    deadlineAt: task.deadlineAt,
  })
  const [deadlineStatus, setDeadlineStatus] = useState<DeadlineStatus>(
    currentDeadlineStatus,
  )

  const { mutate: updateTask } = useUpdateTaskMutation()

  const { setState } = useTasksManager()

  const onFinish = useCallback(() => {
    setState((state) => ({
      ...state,
      activeTaskId: null,
    }))
  }, [setState])

  useEffect(() => {
    return () => {
      onFinish()
    }
  }, [onFinish])

  useKey('Escape', onFinish)

  const isDisabled = useMemo(() => {
    if (!name.trim()) {
      return 'Name is required'
    }
  }, [name])

  const handleSubmit = () => {
    if (isDisabled) {
      return
    }

    const fields: Partial<Omit<Task, 'id'>> = {}
    if (name !== task.name) {
      fields.name = name
    }
    if (projectId !== task.projectId) {
      fields.projectId = projectId
    }

    if (
      deadlineStatus !== currentDeadlineStatus &&
      deadlineStatus !== 'overdue'
    ) {
      const now = Date.now()

      const deadlineAt = getDeadlineAt({
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
      withSections
      kind="secondary"
      as="form"
      onSubmit={handleWithPreventDefault<FormEvent<HTMLFormElement>>(() =>
        handleSubmit(),
      )}
    >
      <TaskNameInput
        placeholder="Task name"
        autoFocus
        onChange={setName}
        value={name}
        onSubmit={handleSubmit}
      />

      <HStack
        wrap="wrap"
        justifyContent="space-between"
        fullWidth
        alignItems="center"
        gap={20}
      >
        <HStack alignItems="center" gap={8}>
          <TaskProjectSelector value={projectId} onChange={setProjectId} />
          <TaskDeadlineInput
            value={deadlineStatus}
            onChange={setDeadlineStatus}
          />
        </HStack>
        <HStack alignItems="center" gap={8}>
          <Button isDisabled={isDisabled} onClick={onFinish} kind="secondary">
            Cancel
          </Button>
          <Button>Save</Button>
        </HStack>
      </HStack>
    </Panel>
  )
}
