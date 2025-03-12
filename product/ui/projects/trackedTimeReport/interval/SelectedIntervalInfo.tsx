import { HStack, hStack, vStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { text, Text } from '@lib/ui/text'
import { getIntIntervalLength } from '@lib/utils/interval/getIntIntervalLength'
import { match } from '@lib/utils/match'
import { pluralize } from '@lib/utils/pluralize'
import { format } from 'date-fns'
import { useCallback } from 'react'
import styled from 'styled-components'

import { trackedTimeChartConfig } from '../chart/config'
import { useTimeGrouping } from '../timeGrouping/state'
import { useStartOfSelectedIntervalPoint } from '../timeGrouping/useStartOfSelectedIntervalPoint'
import { TrackedTimeChartTitle } from '../TrackedTimeChartTitle'

import { SelectedIntervalTotal } from './SelectedIntervalTotal'
import { useSelectedInterval } from './useSelectedInterval'

const Row = styled.div`
  ${hStack({
    justifyContent: 'space-between',
    gap: 8,
    wrap: 'wrap',
  })}
`

const Container = styled.div`
  ${vStack({
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
        day: () => format(value, 'MMM d'),
        week: () => format(value, 'MMM d'),
        month: () => format(value, 'MMM yyyy'),
        year: () => new Date(value).getFullYear().toString(),
      }),
    [timeGrouping],
  )
  const intervalStr = [startedAt, endedAt].map(formatDate).join(' - ')

  return (
    <Container>
      <Row>
        <HStack alignItems="center" gap={8}>
          <TrackedTimeChartTitle />
          <Text as="span" color="supporting">
            (<SelectedIntervalTotal />)
          </Text>
        </HStack>
        {dataSize > 1 ? (
          <HStack alignItems="center" gap={8}>
            {pluralize(dataSize, timeGrouping)}{' '}
            <Text as="span" color="supporting">
              ({intervalStr})
            </Text>
          </HStack>
        ) : (
          <span>{formatDate(startedAt)}</span>
        )}
      </Row>
    </Container>
  )
}
