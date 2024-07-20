import { useCurrentFocus } from '@increaser/ui/focus/CurrentFocusProvider'
import { useFocus } from '@increaser/ui/focus/FocusContext'
import { CreateTaskForm } from '@increaser/ui/tasks/form/CreateTaskForm'
import { TaskFormOverlay } from '@increaser/ui/tasks/form/TaskFormOverlay'
import { FinishableComponentProps } from '@lib/ui/props'

type CreateFocusTaskOverlayProps = FinishableComponentProps & {}

export const CreateFocusTaskOverlay = ({
  onFinish,
}: CreateFocusTaskOverlayProps) => {
  const { projectId } = useCurrentFocus()
  const { updateTask } = useFocus()

  return (
    <TaskFormOverlay onFinish={onFinish}>
      <CreateTaskForm
        defaultValue={{
          projectId,
          deadlineType: 'today',
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
    </TaskFormOverlay>
  )
}
