import { Text } from '@lib/ui/text'
import { useTrackedTimeReport } from './state/TrackedTimeReportContext'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { getRecordKeys } from '@lib/utils/record/getRecordKeys'
import { pluralize } from '@lib/utils/pluralize'
import { SectionTitle } from '@lib/ui/text/SectionTitle'

export const TrackedTimeReportTitle = () => {
  const { timeGrouping, projectsTimeSeries } = useTrackedTimeReport()

  return (
    <SectionTitle>
      {isEmpty(getRecordKeys(projectsTimeSeries)) ||
      isEmpty(Object.values(projectsTimeSeries)[0])
        ? 'No data available'
        : `Last ${pluralize(
            Object.values(projectsTimeSeries)[0].length,
            timeGrouping,
          )} report`}
    </SectionTitle>
  )
}
