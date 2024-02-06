import { IconButton } from '@lib/ui/buttons/IconButton'
import { TrashBinIcon } from '@lib/ui/icons/TrashBinIcon'

import { useCurrentTask } from './CurrentTaskProvider'
import styled from 'styled-components'

import { useDeleteTaskMutation } from '../api/useDeleteHabitMutation'

const Container = styled(IconButton)`
  height: 100%;
  aspect-ratio: 1/1;
`

export const DeleteTask = () => {
  const { id } = useCurrentTask()

  const { mutate: deleteTask } = useDeleteTaskMutation()

  return (
    <Container
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
