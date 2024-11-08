import { sum } from '@lib/utils/array/sum'
import { useSelectedIntervalActiveTimeSeries } from '../chart/useSelectedIntervalActiveTimeSeries'
import { getIntIntervalLength } from '@lib/utils/interval/getIntIntervalLength'
import { useSelectedInterval } from '../interval/useSelectedInterval'
import { useTimeGrouping } from '../timeGrouping/state'
import { text, Text } from '@lib/ui/text'
import { WorkdayAverage } from './WorkdayAverage'
import { WeekendAverage } from './WeekendAverage'
import { EmphasizeNumbers } from '@lib/ui/text/EmphasizeNumbers'
import { formatDuration } from '@lib/utils/time/formatDuration'
import styled from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'
import { horizontalMargin } from '@lib/ui/css/horizontalMargin'

const Container = styled.p`
  ${text({
    centerVertically: true,
  })}
  gap: 8px;
`

const Separator = styled.span`
  ${horizontalMargin(8)};
  width: 1px;
  height: 14px;
  background: ${getColor('textShy')};
`

export const SelectedPeriodAverage = () => {
  const [interval] = useSelectedInterval()
  const dataSize = getIntIntervalLength(interval)
  const timeGrouping = useTimeGrouping()

  const timeSeries = useSelectedIntervalActiveTimeSeries()

  return (
    <Container>
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
        />{' '}
        average
      </span>
      {timeGrouping === 'day' && (
        <Text centerVertically as="span" color="supporting">
          (<WorkdayAverage />
          <Separator />
          <WeekendAverage />)
        </Text>
      )}
    </Container>
  )
}
