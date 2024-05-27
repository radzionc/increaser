import { useCurrentTask } from './CurrentTaskProvider'
import styled from 'styled-components'
import { CheckStatus } from '@lib/ui/checklist/CheckStatus'
import { InvisibleHTMLCheckbox } from '@lib/ui/inputs/InvisibleHTMLCheckbox'
import { interactive } from '@lib/ui/css/interactive'
import { useUpdateTaskMutation } from '@increaser/ui/tasks/api/useUpdateTaskMutation'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { checklistItemContentMinHeight } from '@lib/ui/checklist/ChecklistItemFrame'

const Container = styled(CheckStatus)`
  ${interactive};
  position: relative;
  ${sameDimensions(checklistItemContentMinHeight)};
`

export const TaskCheckBox = () => {
  const task = useCurrentTask()
  const { completedAt } = task

  const { mutate: updateTask } = useUpdateTaskMutation()

  const value = !!completedAt

  return (
    <Container isInteractive forwardedAs="label" value={value}>
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
    </Container>
  )
}
