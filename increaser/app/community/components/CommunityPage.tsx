import { Page } from '@lib/next-ui/Page'
import { FixedWidthContent } from '@increaser/app/components/reusable/fixed-width-content'
import { PageTitle } from '@increaser/app/ui/PageTitle'
import { VStack } from '@lib/ui/layout/Stack'
import { UserStateOnly } from '@increaser/app/user/state/UserStateOnly'
import { ClientOnly } from '@increaser/app/ui/ClientOnly'
import { ManageProfile } from './ManageProfile'
import { Scoreboard } from '@increaser/ui/scoreboard/Scoreboard'
import { RequiresOnboarding } from '../../onboarding/RequiresOnboarding'
import { ProductFeaturesBoard } from '../../productFeatures/components/ProductFeaturesBoard'
import { FounderContacts } from './FounderContacts'
import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'
import { SubscribeForUpdatesPrompt } from './SubscribeForUpdatesPrompt'

export const CommunityPage: Page = () => {
  return (
    <FixedWidthContent>
      <ClientOnly>
        <PageTitle documentTitle={`👋 Community`} title="Community" />
      </ClientOnly>
      <UserStateOnly>
        <RequiresOnboarding>
          <UniformColumnGrid minChildrenWidth={320} gap={40}>
            <VStack style={{ width: 'fit-content' }} gap={40}>
              <ManageProfile />
              <Scoreboard />
              <FounderContacts />
            </VStack>
            <VStack gap={20}>
              <SubscribeForUpdatesPrompt />
              <ProductFeaturesBoard />
            </VStack>
          </UniformColumnGrid>
        </RequiresOnboarding>
      </UserStateOnly>
    </FixedWidthContent>
  )
}
