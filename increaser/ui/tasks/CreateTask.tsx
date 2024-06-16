import { DeadlineType } from '@increaser/entities/Task'
import { AddTaskButton } from './AddTaskButton'
import { CreateTaskForm } from './form/CreateTaskForm'
import { useState } from 'react'

type CreateTaskProps = {
  deadlineType: DeadlineType
  order: number
}

export const CreateTask = ({ deadlineType, order }: CreateTaskProps) => {
  const [isActive, setIsActive] = useState(false)
  return isActive ? (
    <CreateTaskForm
      deadlineType={deadlineType}
      order={order}
      onFinish={() => setIsActive(false)}
    />
  ) : (
    <AddTaskButton onClick={() => setIsActive(true)} />
  )
}
