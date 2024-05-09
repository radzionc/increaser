import { FormEvent, useState } from 'react'
import { useKey } from 'react-use'
import { handleWithPreventDefault } from '@increaser/app/shared/events'
import { FinishableComponentProps } from '@lib/ui/props'
import { getId } from '@increaser/entities-utils/shared/getId'
import { DeadlineType, Task } from '@increaser/entities/Task'
import { getDeadlineAt } from '@increaser/entities-utils/task/getDeadlineAt'
import { useCreateTaskMutation } from '../api/useCreateTaskMutation'
import { TaskNameInput } from './TaskNameInput'
import { Panel } from '@lib/ui/panel/Panel'
import { HStack } from '@lib/ui/layout/Stack'
import { TaskProjectSelector } from './TaskProjectSelector'
import { Button } from '@lib/ui/buttons/Button'

type CreateTaskFormProps = FinishableComponentProps & {
  deadlineType: DeadlineType
  order: number
}

export const CreateTaskForm = ({
  onFinish,
  deadlineType,
  order,
}: CreateTaskFormProps) => {
  const [name, setName] = useState('')
  const [projectId, setProjectId] = useState<string | null>(null)

  const { mutate } = useCreateTaskMutation()

  useKey('Escape', onFinish)

  const createTask = () => {
    const startedAt = Date.now()
    const task: Task = {
      name,
      id: getId(),
      startedAt,
      deadlineAt: getDeadlineAt({ now: startedAt, deadlineType }),
      order,
      projectId,
    }
    mutate(task)
    setName('')
  }

  return (
    <Panel
      withSections
      kind="secondary"
      as="form"
      onSubmit={handleWithPreventDefault<FormEvent<HTMLFormElement>>(() => {
        if (name) {
          createTask()
        }
      })}
    >
      <TaskNameInput
        placeholder="Task name"
        autoFocus
        onChange={setName}
        value={name}
        onSubmit={createTask}
      />
      <HStack justifyContent="space-between" fullWidth alignItems="center">
        <TaskProjectSelector value={projectId} onChange={setProjectId} />
        <HStack alignItems="center" gap={8}>
          <Button onClick={onFinish} kind="secondary">
            Cancel
          </Button>
          <Button>Add task</Button>
        </HStack>
      </HStack>
    </Panel>
  )
}
