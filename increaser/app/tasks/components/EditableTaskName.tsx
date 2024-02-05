import { useCurrentTask } from './CurrentTaskProvider'
import { useEffect, useState } from 'react'
import { TaskNameInput } from './TaskNameInput'
import { useUpdateTaskMutation } from '../api/useUpdateTaskMutation'

export const EditableTaskName = () => {
  const task = useCurrentTask()

  const { mutate: updateTask } = useUpdateTaskMutation()

  useEffect(() => {
    if (task.name === value) return

    const timeout = setTimeout(() => {
      updateTask({ id: task.id, fields: { name: value } })
    }, 200)

    return () => clearTimeout(timeout)
  })

  const [value, setValue] = useState(task.name)

  return (
    <TaskNameInput
      onBlur={() => updateTask({ id: task.id, fields: { name: value } })}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}
