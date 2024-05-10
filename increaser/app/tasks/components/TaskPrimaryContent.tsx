import { checklistItemContentMinHeight } from '@lib/ui/checklist/ChecklistItemFrame'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { useCurrentTask } from './CurrentTaskProvider'
import { TaskProject } from './TaskProject'

const Container = styled(Text)`
  line-height: ${toSizeUnit(checklistItemContentMinHeight)};
  word-break: break-word;
`

export const TaskPrimaryContent = () => {
  const { name } = useCurrentTask()

  return (
    <Container>
      <TaskProject />
      {name}
    </Container>
  )
}
