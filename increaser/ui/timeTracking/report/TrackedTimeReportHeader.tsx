import { HStack } from '@lib/ui/layout/Stack'

import { ManageProjectsNamesVisibility } from './filters/ManageProjectsNamesVisibility'
import { Header } from '@lib/ui/layout/Header'
import { TimeGroupingSelector } from './filters/TimeGroupingSelector'
import { TimeFrameSelector } from './filters/TimeFrameSelector'
import { IncludeCurrentPeriodSelector } from './filters/IncludeCurrentPeriodSelector'

export const TrackedTimeReportHeader = () => {
  return (
    <Header>
      <TimeGroupingSelector />
      <HStack alignItems="center" gap={4}>
        <TimeFrameSelector />
        <IncludeCurrentPeriodSelector />
        <ManageProjectsNamesVisibility />
      </HStack>
    </Header>
  )
}
