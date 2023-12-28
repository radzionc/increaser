import { Page } from '@increaser/app/layout/Page'
import { FixedWidthContent } from '@increaser/app/components/reusable/fixed-width-content'
import { PageTitle } from '@increaser/app/ui/PageTitle'
import { VStack } from '@lib/ui/layout/Stack'
import { UserStateOnly } from '@increaser/app/user/state/UserStateOnly'
import { ClientOnly } from '@increaser/app/ui/ClientOnly'
import { ManageProfile } from './ManageProfile'
import { Scoreboard } from './Scoreboard'

export const CommunityPage: Page = () => {
  return (
    <FixedWidthContent>
      <ClientOnly>
        <PageTitle documentTitle={`👋 Community`} title="Community" />
      </ClientOnly>
      <UserStateOnly>
        <VStack style={{ width: 'fit-content' }} gap={40}>
          <ManageProfile />
          <Scoreboard />
        </VStack>
      </UserStateOnly>
    </FixedWidthContent>
  )
}
