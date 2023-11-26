import { getSetsSum } from 'sets/helpers/getSetsSum'
import { Day } from 'sets/hooks/useGroupedByDayCurrentWeekSets'
import { formatDuration } from '@increaser/utils/time/formatDuration'
import { LabeledValue } from '@increaser/ui/text/LabeledValue'
import { VStack } from '@increaser/ui/layout/Stack'

export const DayReport = ({ sets }: Day) => {
  if (!sets.length) return null

  return (
    <VStack style={{ fontSize: 14 }} gap={8}>
      <LabeledValue name="Total">
        {formatDuration(getSetsSum(sets), 'ms')}
      </LabeledValue>
    </VStack>
  )
}
