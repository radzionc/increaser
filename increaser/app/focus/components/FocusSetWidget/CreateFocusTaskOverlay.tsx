import { useCurrentFocus } from '@increaser/ui/focus/CurrentFocusProvider'
import { useFocus } from '@increaser/ui/focus/FocusContext'
import { CreateTaskForm } from '@increaser/ui/tasks/form/CreateTaskForm'
import { TaskFormOverlay } from '@increaser/ui/tasks/form/TaskFormOverlay'
import { FinishableComponentProps } from '@lib/ui/props'
import styled from 'styled-components'

const Content = styled(CreateTaskForm)`
  padding: 0;
  border-radius: 0;
  border: none;
`

type CreateFocusTaskOverlayProps = FinishableComponentProps & {
  order: number
}

export const CreateFocusTaskOverlay = ({
  onFinish,
  order,
}: CreateFocusTaskOverlayProps) => {
  const { projectId } = useCurrentFocus()
  const { updateTask } = useFocus()

  return (
    <TaskFormOverlay onFinish={onFinish}>
      <Content
        defaultValue={{
          projectId,
        }}
        deadlineType="today"
        order={order}
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
