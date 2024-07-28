import { useCurrentFocus } from '@increaser/ui/focus/CurrentFocusProvider'
import { useFocus } from '@increaser/ui/focus/FocusContext'
import { CreateTaskForm } from '@increaser/ui/tasks/form/CreateTaskForm'
import { PanelModal } from '@lib/ui/modal/PanelModal'
import { FinishableComponentProps } from '@lib/ui/props'

type CreateFocusTaskOverlayProps = FinishableComponentProps & {}

export const CreateFocusTaskOverlay = ({
  onFinish,
}: CreateFocusTaskOverlayProps) => {
  const { projectId } = useCurrentFocus()
  const { updateTask } = useFocus()

  return (
    <PanelModal onFinish={onFinish}>
      <CreateTaskForm
        defaultValue={{
          projectId,
        }}
        onFinish={(task) => {
          if (task) {
            updateTask({
              id: task.id,
              startedAt: Date.now(),
            })
          }
          onFinish()
        }}
      />
    </PanelModal>
  )
}
