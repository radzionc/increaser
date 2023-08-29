import { Page } from 'components/Page'
import { FixedWidthContent } from 'components/reusable/fixed-width-content'
import { PageTitle } from 'ui/PageTitle'
import { CurrentMonthUsers } from './CurrentMonthUsers'
import { HStack } from '@increaser/ui/ui/Stack'
import { PublicProfile } from './PublicProfile'
import { UserStateOnly } from 'user/state/UserStateOnly'
import { ClientOnly } from 'ui/ClientOnly'
import { getMonthName } from '@increaser/utils/time/getMonthName'

export const CommunityPage: Page = () => {
  return (
    <FixedWidthContent>
      <ClientOnly>
        <PageTitle
          documentTitle={`👋 Community`}
          title={`${getMonthName(Date.now())} Top Performers`}
        />
      </ClientOnly>
      <UserStateOnly>
        <HStack alignItems="start" wrap="wrap" gap={40}>
          <CurrentMonthUsers />
          <PublicProfile />
        </HStack>
      </UserStateOnly>
    </FixedWidthContent>
  )
}
