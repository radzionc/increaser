import { TaskChecklistItem } from '@increaser/entities/Task'
import { ListTodoIcon } from '@lib/ui/icons/ListTodoIcon'
import { ValueFinishProps } from '@lib/ui/props'
import { ExpandableSelectorContainer } from '@lib/ui/select/ExpandableSelectorContainer'
import { getTaskChecklistItemInitialValue } from './getTaskChecklistItemInitialValue'

export const AddTaskChecklist = ({
  onFinish,
}: ValueFinishProps<TaskChecklistItem[]>) => {
  return (
    <ExpandableSelectorContainer
      title="Add sub-tasks"
      onClick={() => {
        onFinish([getTaskChecklistItemInitialValue()])
      }}
    >
      <ListTodoIcon />
    </ExpandableSelectorContainer>
  )
}
