import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { useTrackedTimeReport } from '../state/TrackedTimeReportContext'
import { Text } from '@lib/ui/text'
import { TimeFrame, timeFrames } from '../TimeGrouping'

const getOptionName = (option: TimeFrame, timeGrouping: string) =>
  option === null ? 'All' : `Last ${option} ${timeGrouping}s`

export const TimeFrameSelector = () => {
  const { timeGrouping, timeFrame, setState } = useTrackedTimeReport()

  return (
    <ExpandableSelector<TimeFrame>
      value={timeFrame}
      onChange={(timeFrame) => setState((state) => ({ ...state, timeFrame }))}
      options={timeFrames[timeGrouping]}
      getOptionKey={(option) => (option ?? 'all').toString()}
      getOptionName={(option) => getOptionName(option, timeGrouping)}
      renderOption={(option) => (
        <Text>{getOptionName(option, timeGrouping)}</Text>
      )}
    />
  )
}
