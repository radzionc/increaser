import { getSetsSum } from 'sets/helpers/getSetsSum'
import { Day } from 'sets/hooks/useGroupedByDayCurrentWeekSets'
import { formatDuration } from 'shared/utils/formatDuration'
import { LabeledValue } from '@increaser/ui/ui/LabeledValue'
import { VStack } from '@increaser/ui/ui/Stack'

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
