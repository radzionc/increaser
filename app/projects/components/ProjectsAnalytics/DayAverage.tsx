import { useGroupedByWeekdaySetsTotal } from 'sets/hooks/useGroupedByWeekdaySetsTotal'
import { useWeekday } from '@increaser/ui/hooks/useWeekday'
import { formatDuration } from '@increaser/utils/time/formatDuration'
import { sum } from '@increaser/utils/array/sum'
import { LabeledValue } from '@increaser/ui/ui/LabeledValue'
import { HStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'

export const DayAverage = () => {
  const totals = useGroupedByWeekdaySetsTotal()

  const currentWeekday = useWeekday()

  const passedWorkdays = Math.min(currentWeekday, 5)
  const isNotMonday = passedWorkdays > 0

  return (
    <Text as="div" size={14}>
      <LabeledValue name="Workday avg">
        {isNotMonday ? (
          <HStack alignItems="center" gap={4}>
            <Text weight="bold">
              {formatDuration(
                sum(totals.slice(0, passedWorkdays)) / passedWorkdays,
                'ms',
                { maxUnit: 'h' },
              )}
            </Text>
          </HStack>
        ) : (
          <Text>-</Text>
        )}
      </LabeledValue>
    </Text>
  )
}
