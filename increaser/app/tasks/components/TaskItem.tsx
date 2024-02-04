import { IconButton } from '@lib/ui/buttons/IconButton'
import { TrashBinIcon } from '@lib/ui/icons/TrashBinIcon'

import { useCurrentTask } from './CurrentTaskProvider'
import { HStack } from '@lib/ui/layout/Stack'
import { ManageTaskDeadline } from './ManageTaskDeadline'
import styled from 'styled-components'
import { ChecklistItemFrame } from '@lib/ui/checklist/ChecklistItemFrame'
import { CheckStatus } from '@lib/ui/checklist/CheckStatus'
import { Text } from '@lib/ui/text'
import { InvisibleHTMLCheckbox } from '@lib/ui/inputs/InvisibleHTMLCheckbox'
import { interactive } from '@lib/ui/css/interactive'
import { cropText } from '@lib/ui/css/cropText'
import { useUpdateTaskMutation } from '../api/useUpdateTaskMutation'
import { useDeleteTaskMutation } from '../api/useDeleteHabitMutation'

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
  align-items: center;
  gap: 8px;

  &:hover ${Actions} {
    opacity: 1;
  }
`

const Check = styled(CheckStatus)`
  ${interactive};
`

const Content = styled(ChecklistItemFrame)`
  overflow: hidden;
`

const TaskName = styled(Text)`
  ${cropText};
  width: 100%;
`

export const TaskItem = () => {
  const task = useCurrentTask()
  const { id, name, completedAt } = task

  const { mutate: updateTask } = useUpdateTaskMutation()
  const { mutate: deleteTask } = useDeleteTaskMutation()

  const value = !!completedAt

  return (
    <Container>
      <Content>
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
        <TaskName>{name}</TaskName>
      </Content>
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
