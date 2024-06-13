import { FixedWidthContent } from '@increaser/app/components/reusable/fixed-width-content'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { UserStateOnly } from '@increaser/app/user/state/UserStateOnly'

import { PageTitle } from '@increaser/app/ui/PageTitle'
import { ManageSchedule } from '@increaser/ui/schedule/ManageSchedule'
import { SetsExplorer } from './SetsExplorer'
import { ScheduleReview } from './ScheduleReview'
import { Page } from '@lib/next-ui/Page'
import { ScheduleVisualization } from '@increaser/ui/schedule/ScheduleVisualization'

const title = 'Schedule'

export const SessionsPage: Page = () => {
  return (
    <FixedWidthContent>
      <PageTitle documentTitle={`☕️ ${title}`} title={title} />
      <VStack gap={80}>
        <UserStateOnly>
          <HStack gap={40} fullWidth wrap="wrap">
            <VStack style={{ flex: 1 }} gap={40}>
              <ScheduleVisualization />
              <ManageSchedule />
            </VStack>
            <ScheduleReview />
          </HStack>
          <SetsExplorer />
        </UserStateOnly>
      </VStack>
    </FixedWidthContent>
  )
}
