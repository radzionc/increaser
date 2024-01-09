import { IconButton } from '@lib/ui/buttons/IconButton'
import { TrashBinIcon } from '@lib/ui/icons/TrashBinIcon'
import { OnHoverAction } from '@lib/ui/base/OnHoverAction'
import { useUpdateUserMutation } from '@increaser/app/user/mutations/useUpdateUserMutation'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'

import { useCurrentTask } from './CurrentTaskProvider'
import { ChecklistItem } from '@lib/ui/checklist/CheckListItem'

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
