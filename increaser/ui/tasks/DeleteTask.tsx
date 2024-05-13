import { IconButton } from '@lib/ui/buttons/IconButton'
import { TrashBinIcon } from '@lib/ui/icons/TrashBinIcon'

import { useCurrentTask } from './CurrentTaskProvider'

import { useDeleteTaskMutation } from '@increaser/ui/tasks/api/useDeleteHabitMutation'

export const DeleteTask = () => {
  const { id } = useCurrentTask()

  const { mutate: deleteTask } = useDeleteTaskMutation()

  return (
    <IconButton
      kind="alert"
      title="Delete task"
      icon={<TrashBinIcon />}
      onClick={() => {
        deleteTask({
          id,
        })
      }}
    />
  )
}
