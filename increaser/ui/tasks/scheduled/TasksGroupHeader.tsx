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
import { useTaskTimeGrouping } from '../timeGrouping/useTaskTimeGrouping'
import { match } from '@lib/utils/match'
import { isThisWeek } from '@lib/utils/time/isThisWeek'
import { isNextWeek } from '@lib/utils/time/isNextWeek'
import { formatWeek } from '@lib/utils/time/Week'
import { ScheduledTaskGroupId } from './ScheduledTaskGroupId'

const Container = styled(HStackSeparatedBy)`
  font-size: 14px;
  font-weight: 500;
  color: ${getColor('textSupporting')};
`

export const TasksGroupHeader = ({
  value,
}: ComponentWithValueProps<ScheduledTaskGroupId>) => {
  const [timeGrouping] = useTaskTimeGrouping()

  const deadline = useMemo(() => {
    if (value === 'overdue') {
      return ['Overdue']
    }

    const timestamp = Number(value)

    return match(timeGrouping, {
      day: () => {
        const result = [format(timestamp, 'd MMM')]
        if (isToday(timestamp)) {
          result.push('Today')
        } else if (isTomorrow(timestamp)) {
          result.push('Tomorrow')
        }

        result.push(format(timestamp, 'EEEE'))

        return result
      },
      week: () => {
        const result: string[] = []

        if (isThisWeek(timestamp)) {
          result.push('This week')
        } else if (isNextWeek(timestamp)) {
          result.push('Next week')
        }

        result.push(formatWeek(timestamp))

        return result
      },
    })
  }, [timeGrouping, value])

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
