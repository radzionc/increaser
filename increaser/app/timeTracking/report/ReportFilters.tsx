import { IncludeCurrentPeriodSelector } from './IncludeCurrentPeriodSelector'
import { TimeFrameSelector } from './TimeFrameSelector'
import { TimeGroupingSelector } from './TimeGroupingSelector'
import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'

export const ReportFilters = () => {
  return (
    <UniformColumnGrid
      style={{ minWidth: 320, flex: 1, justifyContent: 'end' }}
      minChildrenWidth={160}
      gap={8}
    >
      <TimeGroupingSelector />
      <TimeFrameSelector />
      <IncludeCurrentPeriodSelector />
    </UniformColumnGrid>
  )
}
