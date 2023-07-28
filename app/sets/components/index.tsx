import { FixedWidthContent } from 'components/reusable/fixed-width-content'
import { VStack } from '@increaser/ui/ui/Stack'
import { UserStateOnly } from 'user/state/UserStateOnly'

import { ScheduleEducationBanner } from './ScheduleEducationBanner'
import { SessionsPageContent } from './SessionsPageContent'
import { PageTitle } from 'ui/PageTitle'

const title = 'Work Schedule'

export const SessionsPage = () => {
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
