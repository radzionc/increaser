import { useState } from 'react'

import { useProjectFilter } from '../projects/filter/project/state/projectFilter'

import { AddTaskButton } from './AddTaskButton'
import { CreateTaskForm } from './form/CreateTaskForm'
import { TaskFormShape } from './form/TaskFormShape'

type CreateTaskProps = {
  defaultValue?: Partial<TaskFormShape>
}

export const CreateTask = ({ defaultValue }: CreateTaskProps) => {
  const [isActive, setIsActive] = useState(false)

  const [projectId] = useProjectFilter()

  return isActive ? (
    <CreateTaskForm
      initialValue={projectId ? { projectId, ...defaultValue } : defaultValue}
      onFinish={() => setIsActive(false)}
    />
  ) : (
    <AddTaskButton onClick={() => setIsActive(true)} />
  )
}
