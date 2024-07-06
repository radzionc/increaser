import { ClickableComponentProps } from '@lib/ui/props'
import { ListAddButton } from '@lib/ui/list/ListAddButton'

export const AddTaskButton = ({ onClick }: ClickableComponentProps) => (
  <ListAddButton onClick={onClick} text="Add a task" />
)
