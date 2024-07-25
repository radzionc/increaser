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
import { useMemo } from 'react'
import { format, isToday, isTomorrow } from 'date-fns'

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

  const deadline = useMemo(() => {
    if (isOverdue) {
      return ['Overdue']
    }

    const result = [format(value, 'd MMM')]
    if (isToday(value)) {
      result.push('Today')
    } else if (isTomorrow(value)) {
      result.push('Tomorrow')
    }

    result.push(format(value, 'EEEE'))

    return result
  }, [isOverdue, value])

  return (
    <Container separator={dotSeparator}>
      {deadline.map((text, index) => (
        <Text color={isOverdue ? 'idle' : undefined} as="span" key={index}>
          {text}
        </Text>
      ))}
    </Container>
  )
}
