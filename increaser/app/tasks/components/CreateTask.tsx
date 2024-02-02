import { DeadlineType } from '@increaser/entities/Task'
import { AddTaskButton } from './AddTaskButton'
import { AddTask } from './AddTask'
import { useState } from 'react'

type CreateTaskProps = {
  deadlineType: DeadlineType
}

export const CreateTask = ({ deadlineType }: CreateTaskProps) => {
  const [isActive, setIsActive] = useState(false)
  return isActive ? (
    <AddTask deadlineType={deadlineType} onFinish={() => setIsActive(false)} />
  ) : (
    <AddTaskButton onClick={() => setIsActive(true)} />
  )
}
