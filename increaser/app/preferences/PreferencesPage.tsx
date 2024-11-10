import { HStack, VStack } from '@lib/ui/css/stack'
import { ManageWorkBudget } from '@increaser/ui/workBudget/ManageWorkBudget'
import { WorkBudgetReport } from '@increaser/ui/workBudget/WorkBudgetReport'
import { UniformColumnGrid } from '@lib/ui/css/uniformColumnGrid'
import { ScheduleReview } from '../sets/components/ScheduleReview'
import { ScheduleVisualization } from '@increaser/ui/schedule/ScheduleVisualization'
import { ManageSchedule } from '@increaser/ui/schedule/ManageSchedule'
import { SeparatedByLine } from '@lib/ui/layout/SeparatedByLine'

export const PreferencesPage = () => {
  return (
    <SeparatedByLine gap={40}>
      <HStack gap={40} fullWidth wrap="wrap">
        <VStack style={{ flex: 1 }} gap={40}>
          <ScheduleVisualization />
          <ManageSchedule />
        </VStack>
        <ScheduleReview />
      </HStack>
      <UniformColumnGrid
        style={{ alignItems: 'start' }}
        fullWidth
        minChildrenWidth={320}
        gap={40}
      >
        <ManageWorkBudget />
        <WorkBudgetReport />
      </UniformColumnGrid>
    </SeparatedByLine>
  )
}
