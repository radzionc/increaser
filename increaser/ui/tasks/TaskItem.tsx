import { useCurrentTask } from './CurrentTaskProvider'
import { HStack } from '@lib/ui/layout/Stack'
import styled from 'styled-components'
import { TaskItemFrame } from './TaskItemFrame'
import { DeleteTask } from './DeleteTask'
import { useMedia } from 'react-use'
import { ManageTaskSlideover } from './ManageTaskSlideover'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import {
  checklistItemContentMinHeight,
  checklistItemVerticalPadding,
} from '@lib/ui/checklist/ChecklistItemFrame'
import { IconButton } from '@lib/ui/buttons/IconButton'
import { EditIcon } from '@lib/ui/icons/EditIcon'
import { useTasksManager } from './TasksManagerProvider'
import { EditTaskForm } from './EditTaskForm'
import { TaskPrimaryContent } from './TaskPrimaryContent'
import { TaskCheckBox } from './TaskCheckBox'

const OnHoverActions = styled(HStack)`
  align-items: center;
  gap: 4px;
  height: ${toSizeUnit(
    checklistItemContentMinHeight + checklistItemVerticalPadding * 2,
  )};

  &:not(:focus-within) {
    opacity: 0;
  }
`

const Container = styled(HStack)`
  width: 100%;
  gap: 8px;
  align-items: start;

  &:hover ${OnHoverActions} {
    opacity: 1;
  }
`

export const TaskItem = () => {
  const task = useCurrentTask()

  const { setState, activeTaskId } = useTasksManager()

  const isHoverEnabled = useMedia('(hover: hover) and (pointer: fine)')

  if (activeTaskId === task.id) {
    return <EditTaskForm />
  }

  return (
    <Container>
      <TaskItemFrame>
        <TaskCheckBox />
        <TaskPrimaryContent />
      </TaskItemFrame>
      {isHoverEnabled ? (
        <OnHoverActions>
          <IconButton
            title="Edit task"
            icon={<EditIcon />}
            onClick={() =>
              setState((state) => ({ ...state, activeTaskId: task.id }))
            }
          />
          <DeleteTask />
        </OnHoverActions>
      ) : (
        <ManageTaskSlideover />
      )}
    </Container>
  )
}
