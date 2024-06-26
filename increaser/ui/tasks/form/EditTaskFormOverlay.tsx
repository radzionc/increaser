import { FinishableComponentProps } from '@lib/ui/props'
import styled from 'styled-components'
import { EditTaskFormContent } from './EditTaskFormContent'
import { TaskFormOverlay } from './TaskFormOverlay'

const Content = styled(EditTaskFormContent)`
  padding: 0;
  border-radius: 0;
  border: none;
`

export const EditTaskFormOverlay = ({ onFinish }: FinishableComponentProps) => {
  return (
    <TaskFormOverlay onFinish={onFinish}>
      <Content onFinish={onFinish} />
    </TaskFormOverlay>
  )
}
