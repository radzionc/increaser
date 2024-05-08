import { FormEvent, useState } from 'react'
import { useKey } from 'react-use'
import { handleWithPreventDefault } from '@increaser/app/shared/events'
import { FinishableComponentProps } from '@lib/ui/props'
import { getId } from '@increaser/entities-utils/shared/getId'
import { DeadlineType, Task } from '@increaser/entities/Task'
import { getDeadlineAt } from '@increaser/entities-utils/task/getDeadlineAt'
import { CheckStatus } from '@lib/ui/checklist/CheckStatus'
import { useCreateTaskMutation } from '../api/useCreateTaskMutation'
import { TaskItemFrame } from './TaskItemFrame'
import { TaskNameInput } from './TaskNameInput'

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
    }
    mutate(task)
    setName('')
  }

  return (
    <div>
      <TaskItemFrame
        as="form"
        onBlur={() => {
          if (name) {
            createTask()
          } else {
            onFinish()
          }
        }}
        onSubmit={handleWithPreventDefault<FormEvent<HTMLFormElement>>(() => {
          if (name) {
            createTask()
          }
        })}
      >
        <CheckStatus value={false} />
        <TaskNameInput
          placeholder="Task name"
          autoFocus
          onChange={setName}
          value={name}
          onSubmit={createTask}
        />
      </TaskItemFrame>
    </div>
  )
}
