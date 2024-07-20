import { DeadlineType } from '@increaser/entities/Task'
import { AddTaskButton } from './AddTaskButton'
import { CreateTaskForm } from './form/CreateTaskForm'
import { useState } from 'react'

type CreateTaskProps = {
  deadlineType: DeadlineType | null
}

export const CreateTask = ({ deadlineType }: CreateTaskProps) => {
  const [isActive, setIsActive] = useState(false)
  return isActive ? (
    <CreateTaskForm
      defaultValue={{ deadlineType }}
      onFinish={() => setIsActive(false)}
    />
  ) : (
    <AddTaskButton onClick={() => setIsActive(true)} />
  )
}
