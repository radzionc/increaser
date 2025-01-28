import { Match } from '@lib/ui/base/Match'
import { IndexProp } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { format, getISOWeek } from 'date-fns'
import { useStartOfSelectedIntervalPoint } from '../timeGrouping/useStartOfSelectedIntervalPoint'
import { useTimeGrouping } from '../timeGrouping/state'

export const TrackedTimeChartXLabel = ({ index }: IndexProp) => {
  const value = useStartOfSelectedIntervalPoint(index)
  const timeGrouping = useTimeGrouping()

  return (
    <Text nowrap color="supporting" size={12} key={index}>
      <Match
        value={timeGrouping}
        week={() => `#${getISOWeek(value)}`}
        month={() => format(value, 'MMM yyyy')}
        year={() => format(value, 'yyyy')}
        day={() => format(value, 'dd MMM')}
      />
    </Text>
  )
}
