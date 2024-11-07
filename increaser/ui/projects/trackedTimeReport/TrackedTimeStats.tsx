import { Statistic } from '@lib/ui/layout/Statistic'
import { UniformColumnGrid } from '@lib/ui/css/uniformColumnGrid'
import { Panel } from '@lib/ui/css/panel'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { sum } from '@lib/utils/array/sum'
import { EmphasizeNumbers } from '@lib/ui/text/EmphasizeNumbers'
import { useSelectedIntervalActiveTimeSeries } from './chart/useSelectedIntervalActiveTimeSeries'
import { getIntIntervalLength } from '@lib/utils/interval/getIntIntervalLength'
import { useSelectedInterval } from './interval/useSelectedInterval'
import { useTimeGrouping } from './timeGrouping/state'

export const TrackedTimeStats = () => {
  const [interval] = useSelectedInterval()
  const dataSize = getIntIntervalLength(interval)
  const timeGrouping = useTimeGrouping()

  const timeSeries = useSelectedIntervalActiveTimeSeries()

  const noDataAvailable = isEmpty(timeSeries) || dataSize === 0

  return (
    <UniformColumnGrid gap={16} minChildrenWidth={120}>
      <Panel>
        <Statistic
          title={`Average ${timeGrouping}`}
          value={
            noDataAvailable ? undefined : (
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
            )
          }
        />
      </Panel>
      <Panel>
        <Statistic
          title="Total"
          value={
            noDataAvailable ? undefined : (
              <EmphasizeNumbers
                value={formatDuration(
                  sum(Object.values(timeSeries).flat()),
                  's',
                  {
                    minUnit: 'min',
                    maxUnit: 'h',
                  },
                )}
              />
            )
          }
        />
      </Panel>
    </UniformColumnGrid>
  )
}
