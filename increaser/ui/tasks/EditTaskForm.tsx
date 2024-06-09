import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { useKey } from 'react-use'
import { DeadlineStatus, Task } from '@increaser/entities/Task'
import { getDeadlineAt } from '@increaser/entities-utils/task/getDeadlineAt'
import { TaskNameInput } from './TaskNameInput'
import { Panel } from '@lib/ui/panel/Panel'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { TaskProjectSelector } from './TaskProjectSelector'
import { Button } from '@lib/ui/buttons/Button'
import { useCurrentTask } from './CurrentTaskProvider'
import { useUpdateTaskMutation } from '@increaser/ui/tasks/api/useUpdateTaskMutation'
import { getDeadlineStatus } from '@increaser/entities-utils/task/getDeadlineStatus'
import { groupItems } from '@lib/utils/array/groupItems'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { TaskDeadlineInput } from './TaskDeadlineInput'
import { preventDefault } from '@lib/ui/utils/preventDefault'
import { useDeleteTaskMutation } from './api/useDeleteTaskMutation'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'

export const EditTaskForm = () => {
  const { tasks } = useAssertUserState()
  const task = useCurrentTask()
  const [name, setName] = useState(task.name)
  const [projectId, setProjectId] = useState<string>(task.projectId)
  const currentDeadlineStatus = getDeadlineStatus({
    now: Date.now(),
    deadlineAt: task.deadlineAt,
  })
  const [deadlineStatus, setDeadlineStatus] = useState<DeadlineStatus>(
    currentDeadlineStatus,
  )

  const { mutate: updateTask } = useUpdateTaskMutation()
  const { mutate: deleteTask } = useDeleteTaskMutation()

  const [, setActiveItemId] = useActiveItemId()

  const onFinish = useCallback(() => {
    setActiveItemId(null)
  }, [setActiveItemId])

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
      style={{ width: '100%' }}
      onSubmit={preventDefault<FormEvent<HTMLFormElement>>(() =>
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
      <VStack gap={28}>
        <HStack alignItems="center" gap={8}>
          <TaskProjectSelector value={projectId} onChange={setProjectId} />
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
          <Button isDisabled={isDisabled} onClick={onFinish} kind="secondary">
            Cancel
          </Button>
          <Button>Save</Button>
        </HStack>
      </HStack>
    </Panel>
  )
}
