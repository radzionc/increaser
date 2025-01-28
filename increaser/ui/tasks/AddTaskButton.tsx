import { OnClickProp } from '@lib/ui/props'
import { ListAddButton } from '@lib/ui/list/ListAddButton'

export const AddTaskButton = ({ onClick }: OnClickProp) => (
  <ListAddButton onClick={onClick} text="Add a task" />
)
