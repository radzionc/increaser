import { useTrackedTimeReport } from './state/TrackedTimeReportContext'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { getRecordKeys } from '@lib/utils/record/getRecordKeys'
import { pluralize } from '@lib/utils/pluralize'
import { SectionTitle } from '@lib/ui/text/SectionTitle'

export const TrackedTimeReportTitle = () => {
  const { timeGrouping, projectsTimeSeries, dataPointsCount } =
    useTrackedTimeReport()

  return (
    <SectionTitle>
      {isEmpty(getRecordKeys(projectsTimeSeries)) || dataPointsCount === 0
        ? 'No data available'
        : `Last ${pluralize(dataPointsCount, timeGrouping)} report`}
    </SectionTitle>
  )
}
