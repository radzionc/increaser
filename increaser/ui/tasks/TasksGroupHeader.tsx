import {
  HStackSeparatedBy,
  dotSeparator,
} from '@lib/ui/layout/StackSeparatedBy'
import { ComponentWithValueProps } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { getColor } from '@lib/ui/theme/getters'
import { formatTaskDeadline } from '@increaser/entities-utils/task/formatTaskDeadline'

const Container = styled(HStackSeparatedBy)`
  font-size: 14px;
  font-weight: 500;
  color: ${getColor('textSupporting')};
`

export const TasksGroupHeader = ({
  value,
}: ComponentWithValueProps<number>) => {
  const now = useRhythmicRerender(convertDuration(1, 'min', 'ms'))
  const isOverdue = value < now

  return (
    <Container separator={dotSeparator}>
      <Text color={isOverdue ? 'idle' : undefined}>
        {formatTaskDeadline({
          deadlineAt: value,
          now,
        })}
      </Text>
    </Container>
  )
}
