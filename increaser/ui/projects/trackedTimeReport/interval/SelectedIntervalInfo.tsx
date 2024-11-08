import { getIntIntervalLength } from '@lib/utils/interval/getIntIntervalLength'
import { useTimeGrouping } from '../timeGrouping/state'
import { useStartOfSelectedIntervalPoint } from '../timeGrouping/useStartOfSelectedIntervalPoint'
import { useSelectedInterval } from './useSelectedInterval'
import { text, Text } from '@lib/ui/text'
import { pluralize } from '@lib/utils/pluralize'
import styled from 'styled-components'
import { HStack, hStack } from '@lib/ui/css/stack'
import { useCallback } from 'react'
import { match } from '@lib/utils/match'
import { format } from 'date-fns'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { trackedTimeChartConfig } from '../chart/config'
import { TrackedTimeChartTitle } from '../TrackedTimeChartTitle'

const Container = styled.div`
  ${hStack({
    justifyContent: 'space-between',
    gap: 8,
  })}
  ${text({
    color: 'contrast',
    size: 14,
    weight: 600,
  })}
  padding-left: ${toSizeUnit(trackedTimeChartConfig.expectedYLabelWidth)};
`

export const SelectedIntervalInfo = () => {
  const [interval] = useSelectedInterval()
  const timeGrouping = useTimeGrouping()

  const startedAt = useStartOfSelectedIntervalPoint(0)
  const dataSize = getIntIntervalLength(interval)
  const endedAt = useStartOfSelectedIntervalPoint(dataSize - 1)

  const formatDate = useCallback(
    (value: number) =>
      match(timeGrouping, {
        day: () => format(value, 'EEE d'),
        week: () => format(value, 'EEE d'),
        month: () => format(value, 'MMM yyyy'),
        year: () => new Date(value).getFullYear().toString(),
      }),
    [timeGrouping],
  )
  const intervalStr = [startedAt, endedAt].map(formatDate).join(' - ')

  if (dataSize === 1) {
    return <Container>{formatDate(startedAt)}</Container>
  }

  return (
    <Container>
      <TrackedTimeChartTitle />
      <HStack alignItems="center" gap={8}>
        {pluralize(dataSize, timeGrouping)}{' '}
        <Text as="span" color="supporting">
          ({intervalStr})
        </Text>
      </HStack>
    </Container>
  )
}
