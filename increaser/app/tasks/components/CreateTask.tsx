import { DeadlineType } from '@increaser/entities/Task'
import { AddTaskButton } from './AddTaskButton'
import { CreateTaskForm } from './CreateTaskForm'
import { useState } from 'react'

type CreateTaskProps = {
  deadlineType: DeadlineType
}

export const CreateTask = ({ deadlineType }: CreateTaskProps) => {
  const [isActive, setIsActive] = useState(false)
  return isActive ? (
    <CreateTaskForm
      deadlineType={deadlineType}
      onFinish={() => setIsActive(false)}
    />
  ) : (
    <AddTaskButton onClick={() => setIsActive(true)} />
  )
}
