import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { useUpdateUserEntityMutation } from '../userEntity/api/useUpdateUserEntityMutation'
import { useCurrentTask } from './CurrentTaskProvider'
import { TaskCompletionInput } from './TaskCompletionInput'
import { useUser } from '@increaser/ui/user/state/user'

export const TaskCheckBox = () => {
  const { status, id } = useCurrentTask()
  const { tasks } = useUser()

  const { mutate: updateTask } = useUpdateUserEntityMutation('task')

  return (
    <TaskCompletionInput
      value={status === 'done'}
      onChange={(value) => {
        const status = value ? 'done' : 'todo'

        updateTask({
          id: id,
          fields: {
            status,
            order: getLastItemOrder(
              Object.values(tasks)
                .filter((task) => task.status === status)
                .map((task) => task.order),
            ),
          },
        })
      }}
    />
  )
}
