import { IncludeCurrentPeriodSelector } from './IncludeCurrentPeriodSelector'
import { ProjectSelector } from './ProjectSelector'
import { TimeFrameSelector } from './TimeFrameSelector'
import { TimeGroupingSelector } from './TimeGroupingSelector'
import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'

export const ReportFilters = () => {
  return (
    <UniformColumnGrid minChildrenWidth={200} gap={16}>
      <ProjectSelector />
      <TimeGroupingSelector />
      <TimeFrameSelector />
      <IncludeCurrentPeriodSelector />
    </UniformColumnGrid>
  )
}
