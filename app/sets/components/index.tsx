import { FixedWidthContent } from 'components/reusable/fixed-width-content'
import { VStack } from '@increaser/ui/layout/Stack'
import { UserStateOnly } from 'user/state/UserStateOnly'

import { ScheduleEducationBanner } from './ScheduleEducationBanner'
import { SessionsPageContent } from './SessionsPageContent'
import { PageTitle } from 'ui/PageTitle'
import { Page } from 'layout/Page'

const title = 'Work Schedule'

export const SessionsPage: Page = () => {
  return (
    <FixedWidthContent>
      <PageTitle documentTitle={`☕️ ${title}`} title={title} />
      <VStack gap={40}>
        <ScheduleEducationBanner />
        <UserStateOnly>
          <SessionsPageContent />
        </UserStateOnly>
      </VStack>
    </FixedWidthContent>
  )
}
