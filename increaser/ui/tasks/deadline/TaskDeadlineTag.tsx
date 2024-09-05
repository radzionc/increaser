import styled from 'styled-components'
import { useCurrentTask } from '../CurrentTaskProvider'
import { getColor } from '@lib/ui/theme/getters'
import { formatTaskDeadline } from '@increaser/entities-utils/task/formatTaskDeadline'

import { TaskTagContainer } from '../TaskTagContainer'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { CalendarIcon } from '@lib/ui/icons/CalendarIcon'

const Container = styled(TaskTagContainer)`
  color: ${getColor('idle')};
`

const IconContainer = styled.span`
  vertical-align: middle;
  margin-right: 4px;
`

export const TaskDeadlineTag = () => {
  const { deadlineAt, status } = useCurrentTask()

  const now = useRhythmicRerender(convertDuration(1, 'min', 'ms'))

  if (!deadlineAt || status === 'done') return null

  return (
    <Container>
      <IconContainer>
        <CalendarIcon />
      </IconContainer>
      {now > deadlineAt ? 'Overdue' : formatTaskDeadline({ deadlineAt, now })}
    </Container>
  )
}
