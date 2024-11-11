import { getRecurringTaskDeadline } from '@increaser/entities-utils/taskFactory/getRecurringTaskDeadline'
import { TaskCadence } from '@increaser/entities/TaskFactory'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { LabeledValue } from '@lib/ui/text/LabeledValue'
import { match } from '@lib/utils/match'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useMemo } from 'react'
import styled from 'styled-components'
import { addMonths } from 'date-fns'
import { formatTaskDeadline } from '@increaser/entities-utils/task/formatTaskDeadline'
import { startOfISOWeek } from 'date-fns'
import { useUser } from '../../user/state/user'
import { getNextWorkday } from '@increaser/entities-utils/preferences/getNextWorkday'

type Props = {
  cadence: TaskCadence
  deadlineIndex: number | null
}

const Container = styled(LabeledValue)`
  font-size: 14px;
  font-weight: 500;
`

export const FirstTaskDeadlineForecast = ({
  cadence,
  deadlineIndex,
}: Props) => {
  const now = useRhythmicRerender()

  const { weekends } = useUser()

  const deadlineAt = useMemo(() => {
    const currentPeriodDeadlineAt = getRecurringTaskDeadline({
      cadence,
      deadlineIndex,
      at: now,
    })

    if (currentPeriodDeadlineAt > now) {
      return currentPeriodDeadlineAt
    }

    const atNextPeriod = match(cadence, {
      day: () => now + convertDuration(1, 'd', 'ms'),
      workday: () =>
        getNextWorkday({
          weekends,
          at: now,
        }),
      week: () => startOfISOWeek(now).getTime() + convertDuration(1, 'w', 'ms'),
      month: () => addMonths(now, 1).getTime(),
    })

    return getRecurringTaskDeadline({
      cadence,
      deadlineIndex,
      at: atNextPeriod,
    })
  }, [cadence, deadlineIndex, now, weekends])

  return (
    <Container name="Start">
      {formatTaskDeadline({
        deadlineAt,
        now,
      })}
    </Container>
  )
}
