import { AddTaskButton } from './AddTaskButton'
import { CreateTaskForm } from './form/CreateTaskForm'
import { useState } from 'react'
import { TaskFormShape } from './form/TaskFormShape'
import { useProjectFilter } from '../projects/filter/ProjectFilterProvider'

type CreateTaskProps = {
  defaultValue?: Partial<TaskFormShape>
}

export const CreateTask = ({ defaultValue }: CreateTaskProps) => {
  const [isActive, setIsActive] = useState(false)

  const [projectId] = useProjectFilter()

  return isActive ? (
    <CreateTaskForm
      defaultValue={projectId ? { projectId, ...defaultValue } : defaultValue}
      onFinish={() => setIsActive(false)}
    />
  ) : (
    <AddTaskButton onClick={() => setIsActive(true)} />
  )
}
