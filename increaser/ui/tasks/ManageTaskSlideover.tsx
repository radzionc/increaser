import { Opener } from '@lib/ui/base/Opener'
import { IconButton } from '@lib/ui/buttons/IconButton'
import { MoreHorizontalIcon } from '@lib/ui/icons/MoreHorizontalIcon'
import { BottomSlideOver } from '@lib/ui/modal/BottomSlideOver'
import { useCurrentTask } from './CurrentTaskProvider'
import { useDeleteTaskMutation } from '@increaser/ui/tasks/api/useDeleteTaskMutation'
import { MenuOption } from '@lib/ui/menu/MenuOption'
import { TrashBinIcon } from '@lib/ui/icons/TrashBinIcon'
import { EditIcon } from '@lib/ui/icons/EditIcon'
import { useTasksManager } from './TasksManagerProvider'

export const ManageTaskSlideover = () => {
  const { id } = useCurrentTask()

  const { setState } = useTasksManager()

  const { mutate: deleteTask } = useDeleteTaskMutation()

  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <IconButton
          title="Manage task"
          icon={<MoreHorizontalIcon />}
          onClick={onOpen}
        />
      )}
      renderContent={({ onClose }) => (
        <BottomSlideOver title="Manage task" onClose={onClose}>
          <MenuOption
            view="slideover"
            text="Edit task"
            icon={<EditIcon />}
            onSelect={() =>
              setState((state) => ({ ...state, activeTaskId: id }))
            }
          />
          <MenuOption
            kind="alert"
            view="slideover"
            text="Delete task"
            icon={<TrashBinIcon />}
            onSelect={() => deleteTask({ id })}
          />
        </BottomSlideOver>
      )}
    />
  )
}
