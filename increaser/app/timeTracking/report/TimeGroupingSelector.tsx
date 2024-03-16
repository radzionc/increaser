import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { useTrackedTimeReport } from './TrackedTimeReportProvider'
import { Text } from '@lib/ui/text'
import { formatTimeGrouping, timeGroupings } from './TimeGrouping'

export const TimeGroupingSelector = () => {
  const { timeGrouping, setState } = useTrackedTimeReport()

  return (
    <ExpandableSelector
      style={{ width: 120 }}
      value={timeGrouping}
      onChange={(timeGrouping) =>
        setState((state) => ({ ...state, timeGrouping }))
      }
      options={timeGroupings}
      getOptionKey={formatTimeGrouping}
      renderOption={(option) => (
        <Text color="contrast">{formatTimeGrouping(option)}</Text>
      )}
    />
  )
}
