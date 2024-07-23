import { useCurrentTask } from './CurrentTaskProvider'
import { useUpdateTaskMutation } from '@increaser/ui/tasks/api/useUpdateTaskMutation'
import { TaskCompletionInput } from './TaskCompletionInput'

export const TaskCheckBox = () => {
  const task = useCurrentTask()
  const { completedAt } = task

  const { mutate: updateTask } = useUpdateTaskMutation()

  const value = !!completedAt

  return (
    <TaskCompletionInput
      value={value}
      onChange={() => {
        updateTask({
          id: task.id,
          fields: {
            completedAt: task.completedAt ? null : Date.now(),
          },
        })
      }}
    />
  )
}
