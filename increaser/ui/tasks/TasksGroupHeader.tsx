import { DeadlineStatus, deadlineName } from '@increaser/entities/Task'
import {
  HStackSeparatedBy,
  dotSeparator,
} from '@lib/ui/layout/StackSeparatedBy'
import { ComponentWithValueProps } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { format } from 'date-fns'
import { Match } from '@lib/ui/base/Match'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { getColor } from '@lib/ui/theme/getters'
import { formatWeek } from '@lib/utils/time/Week'
import { formatDay } from '@lib/utils/time/Day'

const Container = styled(HStackSeparatedBy)`
  font-size: 14px;
  font-weight: 500;
  color: ${getColor('textSupporting')};
`

export const TasksGroupHeader = ({
  value,
}: ComponentWithValueProps<DeadlineStatus>) => {
  const now = useRhythmicRerender(convertDuration(1, 'min', 'ms'))
  return (
    <Container separator={dotSeparator}>
      <Text color={value === 'overdue' ? 'idle' : undefined}>
        {deadlineName[value]}
      </Text>
      {value !== 'overdue' && (
        <Text>
          <Match
            value={value}
            none={() => null}
            today={() => formatDay(now)}
            tomorrow={() => formatDay(now + convertDuration(1, 'd', 'ms'))}
            thisWeek={() => formatWeek(now)}
            nextWeek={() => formatWeek(now + convertDuration(1, 'w', 'ms'))}
            thisMonth={() => format(now, 'MMMM')}
          />
        </Text>
      )}
    </Container>
  )
}
