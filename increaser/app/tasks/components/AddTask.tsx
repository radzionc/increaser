import { FormEvent } from 'react'
import { useForm } from 'react-hook-form'
import { useKey } from 'react-use'
import { handleWithPreventDefault } from '@increaser/app/shared/events'
import { FinishableComponentProps } from '@lib/ui/props'
import { getId } from '@increaser/entities-utils/shared/getId'
import styled from 'styled-components'
import { Box } from '@lib/ui/checklist/CheckListItem'
import { useUpdateUserMutation } from '@increaser/app/user/mutations/useUpdateUserMutation'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { ChecklistItemFrame } from '@lib/ui/checklist/ChecklistItemFrame'
import { DeadlineType, Task } from '@increaser/entities/Task'
import { getDeadlineAt } from '@increaser/entities-utils/task/getDeadlineAt'

interface TaskForm {
  name: string
}

const Input = styled.input`
  background: transparent;
  border: none;
  height: 100%;
  width: 100%;
  outline: none;
  color: ${({ theme }) => theme.colors.text.toCssValue()};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textShy.toCssValue()};
  }
`

type AddTaskProps = FinishableComponentProps & {
  deadlineType: DeadlineType
}

export const AddTask = ({ onFinish, deadlineType }: AddTaskProps) => {
  const { register, handleSubmit } = useForm<TaskForm>({
    mode: 'all',
    defaultValues: {
      name: '',
    },
  })

  const { tasks } = useAssertUserState()
  const { mutate } = useUpdateUserMutation()

  useKey('Escape', onFinish)

  const createTask = ({ name }: TaskForm) => {
    const startedAt = Date.now()
    const task: Task = {
      name,
      id: getId(),
      startedAt,
      deadlineAt: getDeadlineAt({ now: startedAt, deadlineType }),
    }
    mutate({ tasks: [...tasks, task] })
    onFinish()
  }

  return (
    <ChecklistItemFrame
      as="form"
      style={{ width: '100%' }}
      onBlur={handleSubmit(createTask, onFinish)}
      onSubmit={handleWithPreventDefault<FormEvent<HTMLFormElement>>(
        handleSubmit(createTask),
      )}
    >
      <Box isChecked={false} />
      <Input
        placeholder="Task name"
        autoFocus
        {...register('name', { required: true })}
      />
    </ChecklistItemFrame>
  )
}
