import { Page } from 'components/Page'
import { FixedWidthContent } from 'components/reusable/fixed-width-content'
import { PageTitle } from 'ui/PageTitle'
import { CurrentMonthUsers } from './CurrentMonthUsers'
import { VStack } from '@increaser/ui/ui/Stack'
import { UserStateOnly } from 'user/state/UserStateOnly'
import { ClientOnly } from 'ui/ClientOnly'
import { getMonthName } from '@increaser/utils/time/getMonthName'
import { ManageProfile } from './ManageProfile'

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
        <VStack style={{ width: 'fit-content' }} gap={40}>
          <ManageProfile />
          <CurrentMonthUsers />
        </VStack>
      </UserStateOnly>
    </FixedWidthContent>
  )
}
