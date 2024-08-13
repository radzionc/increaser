import {
  HStackSeparatedBy,
  dotSeparator,
} from '@lib/ui/layout/StackSeparatedBy'
import { ComponentWithValueProps } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'
import { useMemo } from 'react'
import { format, isToday, isTomorrow } from 'date-fns'
import {
  SpecialTodoTaskGroup,
  specialTodoTaskGroupName,
  specialTodoTaskGroups,
  TodoTaskGroupId,
} from './TodoTaskGroupId'

const Container = styled(HStackSeparatedBy)`
  font-size: 14px;
  font-weight: 500;
  color: ${getColor('textSupporting')};
`

export const TasksGroupHeader = ({
  value,
}: ComponentWithValueProps<TodoTaskGroupId>) => {
  const deadline = useMemo(() => {
    if (specialTodoTaskGroups.includes(value as SpecialTodoTaskGroup)) {
      return [specialTodoTaskGroupName[value as SpecialTodoTaskGroup]]
    }

    const timestamp = Number(value)
    const result = [format(timestamp, 'd MMM')]
    if (isToday(timestamp)) {
      result.push('Today')
    } else if (isTomorrow(timestamp)) {
      result.push('Tomorrow')
    }

    result.push(format(timestamp, 'EEEE'))

    return result
  }, [value])

  return (
    <Container separator={dotSeparator}>
      {deadline.map((text, index) => (
        <Text
          color={value === 'overdue' ? 'idle' : undefined}
          as="span"
          key={index}
        >
          {text}
        </Text>
      ))}
    </Container>
  )
}
