import { FormEvent } from 'react'
import { useForm } from 'react-hook-form'
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

interface TaskForm {
  name: string
}

type CreateTaskFormProps = FinishableComponentProps & {
  deadlineType: DeadlineType
}

export const CreateTaskForm = ({
  onFinish,
  deadlineType,
}: CreateTaskFormProps) => {
  const { register, handleSubmit } = useForm<TaskForm>({
    mode: 'all',
    defaultValues: {
      name: '',
    },
  })

  const { mutate } = useCreateTaskMutation()

  useKey('Escape', onFinish)

  const createTask = ({ name }: TaskForm) => {
    const startedAt = Date.now()
    const task: Task = {
      name,
      id: getId(),
      startedAt,
      deadlineAt: getDeadlineAt({ now: startedAt, deadlineType }),
    }
    mutate(task)
    onFinish()
  }

  return (
    <TaskItemFrame
      as="form"
      style={{ width: '100%' }}
      onBlur={handleSubmit(createTask, onFinish)}
      onSubmit={handleWithPreventDefault<FormEvent<HTMLFormElement>>(
        handleSubmit(createTask),
      )}
    >
      <CheckStatus value={false} />
      <TaskNameInput
        placeholder="Task name"
        autoFocus
        {...register('name', { required: true })}
      />
    </TaskItemFrame>
  )
}
