import { formatDuration } from '@lib/utils/time/formatDuration'
import { sum } from '@lib/utils/array/sum'
import { EmphasizeNumbers } from '@lib/ui/text/EmphasizeNumbers'
import { useSelectedIntervalActiveTimeSeries } from './chart/useSelectedIntervalActiveTimeSeries'
import { getIntIntervalLength } from '@lib/utils/interval/getIntIntervalLength'
import { useSelectedInterval } from './interval/useSelectedInterval'
import { useTimeGrouping } from './timeGrouping/state'
import { text } from '@lib/ui/text'
import styled from 'styled-components'
import { LabeledValue } from '@lib/ui/text/LabeledValue'
import { TimeGrouping } from './timeGrouping/TimeGrouping'

const Container = styled(LabeledValue)`
  ${text({
    centerVertically: true,
    weight: 600,
  })}

  gap: 8px;
`

const name: Record<TimeGrouping, string> = {
  day: 'Daily',
  week: 'Weekly',
  month: 'Monthly',
  year: 'Annual',
}

export const SelectedPeriodAverage = () => {
  const [interval] = useSelectedInterval()
  const dataSize = getIntIntervalLength(interval)
  const timeGrouping = useTimeGrouping()

  const timeSeries = useSelectedIntervalActiveTimeSeries()

  return (
    <Container labelColor="supporting" name={`${name[timeGrouping]} average`}>
      <span>
        <EmphasizeNumbers
          value={formatDuration(
            sum(Object.values(timeSeries).flat()) / dataSize,
            's',
            {
              minUnit: 'min',
              maxUnit: 'h',
            },
          )}
        />
      </span>
    </Container>
  )
}
