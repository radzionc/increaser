import { Match } from '@lib/ui/base/Match'
import { ComponentWithIndexProps } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { getWeekIndex } from '@lib/utils/time/getWeekIndex'
import { format } from 'date-fns'
import { useStartOfSelectedIntervalPoint } from '../timeGrouping/useStartOfSelectedIntervalPoint'
import { useTimeGrouping } from '../timeGrouping/state'

export const TrackedTimeChartXLabel = ({ index }: ComponentWithIndexProps) => {
  const value = useStartOfSelectedIntervalPoint(index)
  const timeGrouping = useTimeGrouping()

  return (
    <Text nowrap color="supporting" size={12} key={index}>
      <Match
        value={timeGrouping}
        week={() => `#${getWeekIndex(value) + 1}`}
        month={() => format(value, 'MMM yyyy')}
        year={() => format(value, 'yyyy')}
        day={() => format(value, 'dd MMM')}
      />
    </Text>
  )
}
