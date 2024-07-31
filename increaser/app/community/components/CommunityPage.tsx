import { Page } from '@lib/next-ui/Page'
import { FixedWidthContent } from '@increaser/app/components/reusable/fixed-width-content'
import { PageTitle } from '@increaser/app/ui/PageTitle'
import { VStack } from '@lib/ui/layout/Stack'
import { UserStateOnly } from '@increaser/app/user/state/UserStateOnly'
import { ManageProfile } from './ManageProfile'
import { Scoreboard } from '@increaser/ui/scoreboard/Scoreboard'
import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'

export const CommunityPage: Page = () => {
  return (
    <FixedWidthContent>
      <PageTitle documentTitle={`👋 Community`} title="Community" />
      <UserStateOnly>
        <UniformColumnGrid minChildrenWidth={320} gap={40}>
          <VStack gap={40}>
            <Scoreboard />
          </VStack>
          <VStack gap={20}>
            <ManageProfile />
          </VStack>
        </UniformColumnGrid>
      </UserStateOnly>
    </FixedWidthContent>
  )
}
