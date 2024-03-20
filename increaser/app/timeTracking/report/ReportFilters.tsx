import { IncludeCurrentPeriodSelector } from './IncludeCurrentPeriodSelector'
import { ProjectSelector } from './ProjectSelector'
import { TimeFrameSelector } from './TimeFrameSelector'
import { TimeGroupingSelector } from './TimeGroupingSelector'
import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'

export const ReportFilters = () => {
  return (
    <UniformColumnGrid
      style={{ flex: 1, minWidth: 320 }}
      minChildrenWidth={160}
      gap={8}
    >
      <ProjectSelector />
      <TimeGroupingSelector />
      <TimeFrameSelector />
      <IncludeCurrentPeriodSelector />
    </UniformColumnGrid>
  )
}
