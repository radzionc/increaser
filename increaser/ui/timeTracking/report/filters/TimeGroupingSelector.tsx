import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { useTrackedTimeReport } from '../state/TrackedTimeReportContext'
import { Text } from '@lib/ui/text'
import { formatTimeGrouping, timeGroupings } from '../TimeGrouping'

export const TimeGroupingSelector = () => {
  const { timeGrouping, setState } = useTrackedTimeReport()

  return (
    <ExpandableSelector
      value={timeGrouping}
      onChange={(timeGrouping) =>
        setState((state) => ({ ...state, timeGrouping }))
      }
      options={timeGroupings}
      getOptionKey={formatTimeGrouping}
      renderOption={(option) => <Text>{formatTimeGrouping(option)}</Text>}
    />
  )
}
