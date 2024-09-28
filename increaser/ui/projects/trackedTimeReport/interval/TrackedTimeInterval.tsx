import { HStack, VStack } from '@lib/ui/css/stack'
import styled from 'styled-components'
import { Spacer } from '@lib/ui/layout/Spacer'
import { normalizeDataArrays } from '@lib/utils/math/normalizeDataArrays'
import { takeWholeSpaceAbsolutely } from '@lib/ui/css/takeWholeSpaceAbsolutely'
import { toPercents } from '@lib/utils/toPercents'
import { useMaxIntervalActiveTimeSeries } from '../chart/useMaxIntervalActiveTimeSeries'
import { BarChartItem } from './BarChartItem'
import { trackedTimeChartConfig } from '../chart/config'
import { trackedTimeIntervalConfig } from './config'
import { useTrackedTimeSelectedInterval } from './useTrackedTimeSelectedInterval'
import { ManageTrackedTimeInterval } from './ManageTrackedTimeInterval'
import { isInInterval } from '@lib/utils/interval/isInInterval'

const Content = styled.div`
  ${takeWholeSpaceAbsolutely};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(8px, 1fr));

  align-items: end;
`

export const TrackedTimeInterval = () => {
  const data = useMaxIntervalActiveTimeSeries()

  const normalized = normalizeDataArrays({
    data,
    min: [0],
  })

  const [interval] = useTrackedTimeSelectedInterval()
  console.log(interval)

  return (
    <VStack fullWidth gap={20}>
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

              return (
                <BarChartItem
                  key={index}
                  isActive={isInInterval(interval, index)}
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
