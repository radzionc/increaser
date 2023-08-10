import { IconButton } from '@increaser/ui/ui/buttons/IconButton'
import { TrashBinIcon } from '@increaser/ui/ui/icons/TrashBinIcon'
import { OnHoverAction } from '@increaser/ui/ui/OnHoverAction'
import { useUpdateUserMutation } from 'user/mutations/useUpdateUserMutation'
import { useAssertUserState } from 'user/state/UserStateContext'

import { useCurrentTask } from './CurrentTaskProvider'
import { ChecklistItem } from '@increaser/ui/ui/checklist/CheckListItem'

export const TaskItem = () => {
  const task = useCurrentTask()
  const { id, name, isCompleted } = task

  const { tasks } = useAssertUserState()
  const { mutate } = useUpdateUserMutation()

  return (
    <OnHoverAction
      actionPlacerStyles={{ right: 0 }}
      action={
        <IconButton
          title="Delete task"
          kind="secondary"
          icon={<TrashBinIcon />}
          onClick={() => {
            mutate({
              tasks: tasks.filter((task) => task.id !== id),
            })
          }}
        />
      }
      render={() => (
        <ChecklistItem
          shouldCrossOut
          style={{ width: '100%' }}
          onChange={() => {
            mutate({
              tasks: tasks.map((task) => {
                if (task.id === id) {
                  return {
                    ...task,
                    isCompleted: !isCompleted,
                  }
                }
                return task
              }),
            })
          }}
          value={isCompleted}
          name={name}
        />
      )}
    />
  )
}
