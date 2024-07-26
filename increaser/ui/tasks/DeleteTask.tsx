import { IconButton } from '@lib/ui/buttons/IconButton'
import { TrashBinIcon } from '@lib/ui/icons/TrashBinIcon'

import { useCurrentTask } from './CurrentTaskProvider'
import { useDeleteUserEntityMutation } from '../userEntity/api/useDeleteUserEntityMutation'

export const DeleteTask = () => {
  const { id } = useCurrentTask()

  const { mutate: deleteTask } = useDeleteUserEntityMutation('task')

  return (
    <IconButton
      kind="alert"
      title="Delete task"
      icon={<TrashBinIcon />}
      onClick={() => {
        deleteTask(id)
      }}
    />
  )
}
