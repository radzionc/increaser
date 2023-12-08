import { Page } from 'layout/Page'
import { FixedWidthContent } from 'components/reusable/fixed-width-content'
import { PageTitle } from 'ui/PageTitle'
import { VStack } from '@increaser/ui/layout/Stack'
import { UserStateOnly } from 'user/state/UserStateOnly'
import { ClientOnly } from 'ui/ClientOnly'
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
