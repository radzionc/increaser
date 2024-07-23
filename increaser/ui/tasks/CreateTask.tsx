import { AddTaskButton } from './AddTaskButton'
import { CreateTaskForm } from './form/CreateTaskForm'
import { useState } from 'react'

type CreateTaskProps = {
  deadlineAt: number | null
}

export const CreateTask = ({ deadlineAt }: CreateTaskProps) => {
  const [isActive, setIsActive] = useState(false)
  return isActive ? (
    <CreateTaskForm
      defaultValue={{ deadlineAt }}
      onFinish={() => setIsActive(false)}
    />
  ) : (
    <AddTaskButton onClick={() => setIsActive(true)} />
  )
}
