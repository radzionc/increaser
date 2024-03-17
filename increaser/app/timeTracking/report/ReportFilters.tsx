import { VStack } from '@lib/ui/layout/Stack'
import { IncludeCurrentPeriodSelector } from './IncludeCurrentPeriodSelector'
import { ProjectSelector } from './ProjectSelector'
import { TimeFrameSelector } from './TimeFrameSelector'
import { TimeGroupingSelector } from './TimeGroupingSelector'

export const ReportFilters = () => {
  return (
    <VStack style={{ minWidth: 200, maxWidth: 200 }} gap={16}>
      <ProjectSelector />
      <TimeGroupingSelector />
      <TimeFrameSelector />
      <IncludeCurrentPeriodSelector />
    </VStack>
  )
}
