import styled from 'styled-components'
import { useCurrentTask } from '../CurrentTaskProvider'
import { getColor } from '@lib/ui/theme/getters'
import { formatTaskDeadline } from '@increaser/entities-utils/task/formatTaskDeadline'

import { TaskTagContainer } from '../TaskTagContainer'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { convertDuration } from '@lib/utils/time/convertDuration'

const Container = styled(TaskTagContainer)`
  color: ${getColor('idle')};
`

export const TaskDeadlineTag = () => {
  const { deadlineAt, status } = useCurrentTask()

  const now = useRhythmicRerender(convertDuration(1, 'min', 'ms'))

  if (!deadlineAt || status === 'done') return null

  return (
    <Container>
      {now > deadlineAt ? 'Overdue' : formatTaskDeadline({ deadlineAt, now })}
    </Container>
  )
}
