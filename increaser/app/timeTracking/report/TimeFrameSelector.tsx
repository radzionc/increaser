import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { useTrackedTimeReport } from './state/TrackedTimeReportContext'
import { Text } from '@lib/ui/text'
import { TimeFrame, timeFrames } from './TimeGrouping'

export const TimeFrameSelector = () => {
  const { timeGrouping, timeFrame, setState } = useTrackedTimeReport()

  return (
    <ExpandableSelector<TimeFrame>
      value={timeFrame}
      onChange={(timeFrame) => setState((state) => ({ ...state, timeFrame }))}
      options={timeFrames[timeGrouping]}
      getOptionKey={(option) => (option ?? 'all').toString()}
      renderOption={(option) => (
        <Text>
          {option === null ? 'All' : `Last ${option}`} {timeGrouping}s
        </Text>
      )}
    />
  )
}
