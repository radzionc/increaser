import { IncludeCurrentPeriodSelector } from './IncludeCurrentPeriodSelector'
import { TimeFrameSelector } from './TimeFrameSelector'
import { TimeGroupingSelector } from './TimeGroupingSelector'

export const ReportFilters = () => (
  <>
    <TimeGroupingSelector />
    <TimeFrameSelector />
    <IncludeCurrentPeriodSelector />
  </>
)
