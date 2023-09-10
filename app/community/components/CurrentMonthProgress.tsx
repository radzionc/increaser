import { MS_IN_MIN } from '@increaser/utils/time'
import { useRhythmicRerender } from '@increaser/ui/hooks/useRhythmicRerender'
import { startOfMonth, endOfMonth } from 'date-fns'
import { AllocationLine } from 'ui/AllocationLine'
import { useTheme } from 'styled-components'

export const CurrentMonthProgress = () => {
  const now = useRhythmicRerender(MS_IN_MIN)
  const startedAt = startOfMonth(now).getTime()
  const endedAt = endOfMonth(now).getTime()
  const duration = endedAt - startedAt
  const { colors } = useTheme()

  return (
    <AllocationLine
      height={4}
      segments={[
        {
          proportion: (now - startedAt) / duration,
          color: colors.primary,
        },
      ]}
    />
  )
}
