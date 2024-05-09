import { useCurrentTask } from './CurrentTaskProvider'
import { HStack } from '@lib/ui/layout/Stack'
import styled from 'styled-components'
import { CheckStatus } from '@lib/ui/checklist/CheckStatus'
import { InvisibleHTMLCheckbox } from '@lib/ui/inputs/InvisibleHTMLCheckbox'
import { interactive } from '@lib/ui/css/interactive'
import { useUpdateTaskMutation } from '../api/useUpdateTaskMutation'
import { TaskItemFrame } from './TaskItemFrame'
import { DeleteTask } from './DeleteTask'
import { useMedia } from 'react-use'
import { ManageTaskSlideover } from './ManageTaskSlideover'
import { Text } from '@lib/ui/text'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import {
  checklistItemContentMinHeight,
  checklistItemVerticalPadding,
} from '@lib/ui/checklist/ChecklistItemFrame'
import { IconButton } from '@lib/ui/buttons/IconButton'
import { EditIcon } from '@lib/ui/icons/EditIcon'
import { useTasksManager } from './TasksManagerProvider'
import { EditTaskForm } from './EditTaskForm'
import { TaskProject } from './TaskProject'

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

const TaskName = styled(Text)`
  line-height: ${toSizeUnit(checklistItemContentMinHeight)};
  word-break: break-word;
`

const Check = styled(CheckStatus)`
  ${interactive};
`

export const TaskItem = () => {
  const task = useCurrentTask()
  const { completedAt } = task

  const { setState, activeTaskId } = useTasksManager()

  const isHoverEnabled = useMedia('(hover: hover) and (pointer: fine)')

  const { mutate: updateTask } = useUpdateTaskMutation()

  const value = !!completedAt

  if (activeTaskId === task.id) {
    return <EditTaskForm />
  }

  return (
    <Container>
      <TaskItemFrame>
        <Check isInteractive forwardedAs="label" value={value}>
          <InvisibleHTMLCheckbox
            value={value}
            onChange={() => {
              updateTask({
                id: task.id,
                fields: {
                  completedAt: task.completedAt ? null : Date.now(),
                },
              })
            }}
          />
        </Check>
        <TaskName>
          <TaskProject />
          {task.name}
        </TaskName>
      </TaskItemFrame>
      {isHoverEnabled ? (
        <OnHoverActions>
          <IconButton
            kind="secondary"
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
