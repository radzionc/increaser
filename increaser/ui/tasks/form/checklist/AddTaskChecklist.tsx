import { TaskChecklistItem } from '@increaser/entities/Task'
import { OnFinishValueProp } from '@lib/ui/props'
import { ExpandableSelectorContainer } from '@lib/ui/select/ExpandableSelectorContainer'
import { getTaskChecklistItemInitialValue } from './getTaskChecklistItemInitialValue'
import { useIsChecklistOpen } from './state/isChecklistOpen'
import { CheckSquareIcon } from '@lib/ui/icons/CheckSquareIcon'

export const AddTaskChecklist = ({
  onFinish,
}: OnFinishValueProp<TaskChecklistItem[]>) => {
  const [, setIsOpen] = useIsChecklistOpen()

  return (
    <ExpandableSelectorContainer
      title="Add sub-tasks"
      onClick={() => {
        setIsOpen(true)
        onFinish([getTaskChecklistItemInitialValue()])
      }}
    >
      <CheckSquareIcon />
    </ExpandableSelectorContainer>
  )
}
