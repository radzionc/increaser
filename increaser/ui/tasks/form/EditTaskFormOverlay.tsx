import { FinishableComponentProps } from '@lib/ui/props'
import { EditTaskFormContent } from './EditTaskFormContent'
import { TaskFormOverlay } from './TaskFormOverlay'

export const EditTaskFormOverlay = ({ onFinish }: FinishableComponentProps) => {
  return (
    <TaskFormOverlay onFinish={onFinish}>
      <EditTaskFormContent onFinish={onFinish} />
    </TaskFormOverlay>
  )
}
