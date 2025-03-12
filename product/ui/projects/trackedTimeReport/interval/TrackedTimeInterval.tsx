import { HStack, VStack } from '@lib/ui/css/stack'
import { takeWholeSpaceAbsolutely } from '@lib/ui/css/takeWholeSpaceAbsolutely'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { Spacer } from '@lib/ui/layout/Spacer'
import { isInInterval } from '@lib/utils/interval/isInInterval'
import { normalizeDataArrays } from '@lib/utils/math/normalizeDataArrays'
import { toPercents } from '@lib/utils/toPercents'
import styled from 'styled-components'

import { trackedTimeChartConfig } from '../chart/config'
import { useTotalIntervalActiveTimeSeries } from '../chart/useTotalIntervalActiveTimeSeries'

import { trackedTimeIntervalConfig } from './config'
import { IntervalBarChartItem } from './IntervalBarChartItem'
import { ManageTrackedTimeInterval } from './ManageTrackedTimeInterval'
import { useSelectedInterval } from './useSelectedInterval'

const Content = styled.div`
  ${takeWholeSpaceAbsolutely};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(8px, 1fr));

  ${verticalPadding(trackedTimeIntervalConfig.chartVerticalPadding)};

  align-items: end;
`

export const TrackedTimeInterval = () => {
  const data = useTotalIntervalActiveTimeSeries()

  const normalized = normalizeDataArrays({
    data,
    min: [0],
  })

  const [interval] = useSelectedInterval()

  return (
    <VStack style={{ userSelect: 'none' }} fullWidth gap={20}>
      <HStack>
        <Spacer width={trackedTimeChartConfig.expectedYLabelWidth} />
        <VStack
          style={{
            position: 'relative',
            height: trackedTimeIntervalConfig.chartHeight,
          }}
          fullWidth
        >
          <Content>
            {normalized.data.map((value, index) => {
              const height = toPercents(value)

              const isActive = isInInterval(interval, index)

              return (
                <IntervalBarChartItem
                  key={index}
                  isActive={isActive}
                  style={{
                    height,
                  }}
                />
              )
            })}
          </Content>
          <ManageTrackedTimeInterval />
        </VStack>
      </HStack>
    </VStack>
  )
}
