import { useSelectedIntervalActiveTimeSeries } from '../chart/useSelectedIntervalActiveTimeSeries'
import { useTimeGrouping } from '../timeGrouping/state'
import { WorkdayAverage } from './WorkdayAverage'
import { WeekendAverage } from './WeekendAverage'
import { VStack } from '@lib/ui/css/stack'
import { TimeGrouping } from '../timeGrouping/TimeGrouping'
import { SeparatedByLine } from '@lib/ui/layout/SeparatedByLine'
import { AverageValue } from './AverageValue'

const periodName: Record<TimeGrouping, string> = {
  day: 'Daily',
  week: 'Weekly',
  month: 'Monthly',
  year: 'Annual',
}

export const SelectedPeriodAverage = () => {
  const timeGrouping = useTimeGrouping()

  const timeSeries = useSelectedIntervalActiveTimeSeries()

  return (
    <SeparatedByLine gap={8}>
      <AverageValue
        name={periodName[timeGrouping]}
        value={Object.values(timeSeries).flat()}
      />
      {timeGrouping === 'day' && (
        <VStack gap={4}>
          <WorkdayAverage />
          <WeekendAverage />
        </VStack>
      )}
    </SeparatedByLine>
  )
}
