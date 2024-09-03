import { Statistic } from '@lib/ui/layout/Statistic'
import { UniformColumnGrid } from '@lib/ui/css/uniformColumnGrid'
import { Panel } from '@lib/ui/css/panel'
import { pluralize } from '@lib/utils/pluralize'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { sum } from '@lib/utils/array/sum'
import { useActiveTimeSeries } from './chart/useActiveTimeSeries'
import { EmphasizeNumbers } from '@lib/ui/text/EmphasizeNumbers'
import { useCurrentDataSize } from './hooks/useCurrentDataSize'
import { useTimeGrouping } from './timeGrouping/useTimeGrouping'

export const TrackedTimeStats = () => {
  const dataSize = useCurrentDataSize()
  const [timeGrouping] = useTimeGrouping()

  const timeSeries = useActiveTimeSeries()

  const noDataAvailable = isEmpty(timeSeries) || dataSize === 0

  return (
    <UniformColumnGrid gap={16} minChildrenWidth={120}>
      <Panel>
        <Statistic
          title="Interval"
          value={
            noDataAvailable ? undefined : pluralize(dataSize, timeGrouping)
          }
        />
      </Panel>
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
