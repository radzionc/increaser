import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { useTrackedTimeReport } from './TrackedTimeReportProvider'
import { Text } from '@lib/ui/text'
import { TimeFrame, timeFrames } from './TimeGrouping'

export const TimeFrameSelector = () => {
  const { timeGrouping, timeFrame, setState } = useTrackedTimeReport()

  return (
    <ExpandableSelector<TimeFrame>
      style={{ width: 152 }}
      value={timeFrame}
      onChange={(timeFrame) => setState((state) => ({ ...state, timeFrame }))}
      options={timeFrames[timeGrouping]}
      getOptionKey={(option) => (option ?? 'all').toString()}
      renderOption={(option) => (
        <Text color="contrast">
          {option === null ? 'All' : `Last ${option}`} {timeGrouping}s
        </Text>
      )}
    />
  )
}
