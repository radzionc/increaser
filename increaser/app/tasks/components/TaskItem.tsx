import { useCurrentTask } from './CurrentTaskProvider'
import { HStack } from '@lib/ui/layout/Stack'
import { ManageTaskDeadline } from './ManageTaskDeadline'
import styled from 'styled-components'
import { CheckStatus } from '@lib/ui/checklist/CheckStatus'
import { InvisibleHTMLCheckbox } from '@lib/ui/inputs/InvisibleHTMLCheckbox'
import { interactive } from '@lib/ui/css/interactive'
import { useUpdateTaskMutation } from '../api/useUpdateTaskMutation'
import { TaskItemFrame } from './TaskItemFrame'
import { EditableTaskName } from './EditableTaskName'
import { DeleteTask } from './DeleteTask'

const Actions = styled.div`
  display: grid;
  grid-template-columns: 60px 36px;
  height: 36px;
  gap: 4px;

  @media (hover: hover) and (pointer: fine) {
    &:not(:focus-within) {
      opacity: 0;
    }
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
  const { completedAt } = task

  const { mutate: updateTask } = useUpdateTaskMutation()

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
        <DeleteTask />
      </Actions>
    </Container>
  )
}
