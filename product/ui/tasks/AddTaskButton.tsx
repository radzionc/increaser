import { ListAddButton } from '@lib/ui/list/ListAddButton'
import { OnClickProp } from '@lib/ui/props'

export const AddTaskButton = ({ onClick }: OnClickProp) => (
  <ListAddButton onClick={onClick} text="Add a task" />
)
