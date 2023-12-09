import { FixedWidthContent } from 'components/reusable/fixed-width-content'
import { HStack, VStack } from '@increaser/ui/layout/Stack'
import { UserStateOnly } from 'user/state/UserStateOnly'

import { ScheduleEducationBanner } from './ScheduleEducationBanner'
import { SessionsPageContent } from './SessionsPageContent'
import { PageTitle } from 'ui/PageTitle'
import { Page } from 'layout/Page'
import { ClientOnly } from 'ui/ClientOnly'
import { Text } from '@increaser/ui/text'
import { ManageSchedule } from './ManageSchedule'

const title = 'Schedule'

export const SessionsPage: Page = () => {
  return (
    <FixedWidthContent>
      <PageTitle
        documentTitle={`☕️ ${title}`}
        title={
          <HStack fullWidth wrap="wrap" alignItems="center" gap={16}>
            <Text>{title}</Text>
            <UserStateOnly>
              <Text as="div" size={16} weight="regular">
                <ManageSchedule />
              </Text>
            </UserStateOnly>
          </HStack>
        }
      />
      <VStack gap={40}>
        <ClientOnly>
          <ScheduleEducationBanner />
        </ClientOnly>
        <UserStateOnly>
          <SessionsPageContent />
        </UserStateOnly>
      </VStack>
    </FixedWidthContent>
  )
}
