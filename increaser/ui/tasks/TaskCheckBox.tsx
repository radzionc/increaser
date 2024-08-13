import { useUpdateUserEntityMutation } from '../userEntity/api/useUpdateUserEntityMutation'
import { useCurrentTask } from './CurrentTaskProvider'
import { TaskCompletionInput } from './TaskCompletionInput'

export const TaskCheckBox = () => {
  const { status, id } = useCurrentTask()

  const { mutate: updateTask } = useUpdateUserEntityMutation('task')

  return (
    <TaskCompletionInput
      value={status === 'done'}
      onChange={(value) => {
        updateTask({
          id: id,
          fields: {
            status: value ? 'done' : 'todo',
          },
        })
      }}
    />
  )
}
