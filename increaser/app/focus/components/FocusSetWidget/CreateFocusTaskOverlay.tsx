import { useCurrentFocus } from '@increaser/ui/focus/CurrentFocusProvider'
import { useFocus } from '@increaser/ui/focus/FocusContext'
import { CreateTaskForm } from '@increaser/ui/tasks/form/CreateTaskForm'
import { PanelModal } from '@lib/ui/modal/PanelModal'
import { FinishableComponentProps } from '@lib/ui/props'
import { getLastItem } from '@lib/utils/array/getLastItem'

type CreateFocusTaskOverlayProps = FinishableComponentProps & {}

export const CreateFocusTaskOverlay = ({
  onFinish,
}: CreateFocusTaskOverlayProps) => {
  const { intervals } = useCurrentFocus()
  const { updateTask } = useFocus()

  const { projectId } = getLastItem(intervals)

  return (
    <PanelModal onFinish={onFinish}>
      <CreateTaskForm
        defaultValue={{
          projectId,
        }}
        onFinish={(task) => {
          if (task) {
            updateTask(task.id)
          }
          onFinish()
        }}
      />
    </PanelModal>
  )
}
