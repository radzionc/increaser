import { useUpdateUserEntityMutation } from '../userEntity/api/useUpdateUserEntityMutation'
import { useCurrentTask } from './CurrentTaskProvider'
import { TaskCompletionInput } from './TaskCompletionInput'

export const TaskCheckBox = () => {
  const task = useCurrentTask()
  const { completedAt } = task

  const { mutate: updateTask } = useUpdateUserEntityMutation('task')

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
