import { HStack, VStack } from '@lib/ui/layout/Stack'

import { ManageSchedule } from '@increaser/ui/schedule/ManageSchedule'
import { Page } from '@lib/next-ui/Page'
import { ScheduleVisualization } from '@increaser/ui/schedule/ScheduleVisualization'
import { ScheduleReview } from '../sets/components/ScheduleReview'
import { WorkTimeReport } from './WorkTimeReport/WorkTimeReport'

export const Schedule: Page = () => {
  return (
    <>
      <HStack gap={40} fullWidth wrap="wrap">
        <VStack style={{ flex: 1 }} gap={40}>
          <ScheduleVisualization />
          <ManageSchedule />
        </VStack>
        <ScheduleReview />
      </HStack>
      <WorkTimeReport />
    </>
  )
}
