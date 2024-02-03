import { IconButton } from '@lib/ui/buttons/IconButton'
import { TrashBinIcon } from '@lib/ui/icons/TrashBinIcon'
import { OnHoverAction } from '@lib/ui/base/OnHoverAction'
import { useUpdateUserMutation } from '@increaser/app/user/mutations/useUpdateUserMutation'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'

import { useCurrentTask } from './CurrentTaskProvider'
import { ChecklistItem } from '@lib/ui/checklist/CheckListItem'
import { HStack } from '@lib/ui/layout/Stack'
import { ManageTaskDeadline } from './ManageTaskDeadline'

export const TaskItem = () => {
  const task = useCurrentTask()
  const { id, name, completedAt } = task

  const { tasks } = useAssertUserState()
  const { mutate } = useUpdateUserMutation()

  return (
    <OnHoverAction
      actionPlacerStyles={{ right: 0 }}
      action={
        <HStack alignItems="center" gap={4}>
          <ManageTaskDeadline />
          <IconButton
            kind="alert"
            title="Delete task"
            icon={<TrashBinIcon />}
            onClick={() => {
              mutate({
                tasks: tasks.filter((task) => task.id !== id),
              })
            }}
          />
        </HStack>
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
                    completedAt: task.completedAt ? undefined : Date.now(),
                  }
                }
                return task
              }),
            })
          }}
          value={!!completedAt}
          name={name}
        />
      )}
    />
  )
}
