import { TaskChecklistItem } from '@increaser/entities/Task'
import { ListTodoIcon } from '@lib/ui/icons/ListTodoIcon'
import { ValueFinishProps } from '@lib/ui/props'
import { ExpandableSelectorContainer } from '@lib/ui/select/ExpandableSelectorContainer'
import { getTaskChecklistItemInitialValue } from './getTaskChecklistItemInitialValue'
import { useIsChecklistOpen } from './state/isChecklistOpen'

export const AddTaskChecklist = ({
  onFinish,
}: ValueFinishProps<TaskChecklistItem[]>) => {
  const [, setIsOpen] = useIsChecklistOpen()

  return (
    <ExpandableSelectorContainer
      title="Add sub-tasks"
      onClick={() => {
        setIsOpen(true)
        onFinish([getTaskChecklistItemInitialValue()])
      }}
    >
      <ListTodoIcon />
    </ExpandableSelectorContainer>
  )
}
