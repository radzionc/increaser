import { Statistic } from '@lib/ui/layout/Statistic'
import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'
import { Panel } from '@lib/ui/panel/Panel'
import { useTrackedTimeReport } from './state/TrackedTimeReportContext'
import { pluralize } from '@lib/utils/pluralize'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { sum } from '@lib/utils/array/sum'
import { useActiveTimeSeries } from './hooks/useActiveTimeSeries'

export const TrackedTimeStats = () => {
  const { timeGrouping, dataPointsCount } = useTrackedTimeReport()

  const timeSeries = useActiveTimeSeries()

  const noDataAvailable = isEmpty(timeSeries) || dataPointsCount === 0

  return (
    <UniformColumnGrid gap={16} minChildrenWidth={120}>
      <Panel>
        <Statistic
          title="Interval"
          value={
            noDataAvailable
              ? undefined
              : pluralize(dataPointsCount, timeGrouping)
          }
        />
      </Panel>
      <Panel>
        <Statistic
          title={`Average ${timeGrouping}`}
          value={
            noDataAvailable
              ? undefined
              : formatDuration(
                  sum(Object.values(timeSeries).flat()) / dataPointsCount,
                  's',
                  {
                    minUnit: 'min',
                    maxUnit: 'h',
                  },
                )
          }
        />
      </Panel>
      <Panel>
        <Statistic
          title="Total"
          value={
            noDataAvailable
              ? undefined
              : formatDuration(sum(Object.values(timeSeries).flat()), 's', {
                  minUnit: 'min',
                  maxUnit: 'h',
                })
          }
        />
      </Panel>
    </UniformColumnGrid>
  )
}
