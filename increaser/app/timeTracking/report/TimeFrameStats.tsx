import { Statistic } from '@lib/ui/layout/Statistic'
import { Panel } from '@lib/ui/panel/Panel'
import { useTrackedTimeReport } from './TrackedTimeReportProvider'
import { useMemo } from 'react'
import { mergeSameSizeDataArrays } from '@lib/utils/math/mergeSameSizeDataArrays'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { sum } from '@lib/utils/array/sum'

export const TimeFrameStats = () => {
  const { timeGrouping, projectsTimeSeries, activeProjectId } =
    useTrackedTimeReport()

  const data = useMemo(() => {
    if (activeProjectId) {
      return projectsTimeSeries[activeProjectId]
    }

    return mergeSameSizeDataArrays(Object.values(projectsTimeSeries))
  }, [activeProjectId, projectsTimeSeries])

  return (
    <>
      <Panel>
        <Statistic
          title={`Last ${data.length} ${timeGrouping}s total`}
          value={formatDuration(sum(data), 's', { maxUnit: 'h' })}
        />
      </Panel>
      <Panel>
        <Statistic
          title={`Avg. per ${timeGrouping}`}
          value={formatDuration(sum(data) / data.length, 's', { maxUnit: 'h' })}
        />
      </Panel>
    </>
  )
}
