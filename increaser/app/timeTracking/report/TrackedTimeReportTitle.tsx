import { Text } from '@lib/ui/text'
import { useTrackedTimeReport } from './TrackedTimeReportProvider'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { getRecordKeys } from '@lib/utils/record/getRecordKeys'
import { pluralize } from '@lib/utils/pluralize'

export const TrackedTimeReportTitle = () => {
  const { timeGrouping, projectsTimeSeries } = useTrackedTimeReport()

  return (
    <Text weight="semibold" color="contrast">
      {isEmpty(getRecordKeys(projectsTimeSeries))
        ? 'No data available'
        : `Last ${pluralize(
            Object.values(projectsTimeSeries)[0].length,
            timeGrouping,
          )} report`}
    </Text>
  )
}
