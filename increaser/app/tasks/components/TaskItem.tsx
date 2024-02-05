import { IconButton } from '@lib/ui/buttons/IconButton'
import { TrashBinIcon } from '@lib/ui/icons/TrashBinIcon'

import { useCurrentTask } from './CurrentTaskProvider'
import { HStack } from '@lib/ui/layout/Stack'
import { ManageTaskDeadline } from './ManageTaskDeadline'
import styled from 'styled-components'
import { CheckStatus } from '@lib/ui/checklist/CheckStatus'
import { InvisibleHTMLCheckbox } from '@lib/ui/inputs/InvisibleHTMLCheckbox'
import { interactive } from '@lib/ui/css/interactive'
import { useUpdateTaskMutation } from '../api/useUpdateTaskMutation'
import { useDeleteTaskMutation } from '../api/useDeleteHabitMutation'
import { TaskItemFrame } from './TaskItemFrame'
import { EditableTaskName } from './EditableTaskName'

const Actions = styled(HStack)`
  gap: 4px;
  align-items: center;
  opacity: 1;

  @media (hover: hover) and (pointer: fine) {
    opacity: 0;
  }
`

const Container = styled(HStack)`
  width: 100%;
  gap: 8px;
  align-items: center;

  &:hover ${Actions} {
    opacity: 1;
  }
`

const Check = styled(CheckStatus)`
  ${interactive};
`

export const TaskItem = () => {
  const task = useCurrentTask()
  const { id, completedAt } = task

  const { mutate: updateTask } = useUpdateTaskMutation()
  const { mutate: deleteTask } = useDeleteTaskMutation()

  const value = !!completedAt

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
        <EditableTaskName />
      </TaskItemFrame>
      <Actions>
        <ManageTaskDeadline />
        <IconButton
          kind="alert"
          title="Delete task"
          icon={<TrashBinIcon />}
          onClick={() => {
            deleteTask({
              id,
            })
          }}
        />
      </Actions>
    </Container>
  )
}
