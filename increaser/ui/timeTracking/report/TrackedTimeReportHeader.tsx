import { HStack } from '@lib/ui/layout/Stack'

import { ManageProjectsNamesVisibility } from './filters/ManageProjectsNamesVisibility'
import { Header } from '@lib/ui/layout/Header'
import { IncludeCurrentPeriodSelector } from './filters/IncludeCurrentPeriodSelector'

export const TrackedTimeReportHeader = () => {
  return (
    <Header>
      <div />
      <HStack alignItems="center" gap={4}>
        <IncludeCurrentPeriodSelector />
        <ManageProjectsNamesVisibility />
      </HStack>
    </Header>
  )
}
