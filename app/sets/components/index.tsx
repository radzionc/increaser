import { FixedWidthContent } from 'components/reusable/fixed-width-content'
import { HStack, VStack } from '@increaser/ui/layout/Stack'
import { UserStateOnly } from 'user/state/UserStateOnly'

import { ScheduleEducationBanner } from './ScheduleEducationBanner'
import { PageTitle } from 'ui/PageTitle'
import { Page } from 'layout/Page'
import { ClientOnly } from 'ui/ClientOnly'
import { ManageSchedule } from './ManageSchedule'
import { SetsExplorer } from './SetsExplorer'
import { ScheduleReview } from './ScheduleReview'

const title = 'Schedule'

export const SessionsPage: Page = () => {
  return (
    <FixedWidthContent>
      <PageTitle documentTitle={`☕️ ${title}`} title={title} />
      <VStack gap={40}>
        <ClientOnly>
          <ScheduleEducationBanner />
        </ClientOnly>
        <UserStateOnly>
          <HStack gap={40} fullWidth wrap="wrap">
            <ManageSchedule />
            <ScheduleReview />
          </HStack>
          <SetsExplorer />
        </UserStateOnly>
      </VStack>
    </FixedWidthContent>
  )
}
