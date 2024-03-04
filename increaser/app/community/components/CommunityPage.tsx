import { Page } from '@lib/next-ui/Page'
import { FixedWidthContent } from '@increaser/app/components/reusable/fixed-width-content'
import { PageTitle } from '@increaser/app/ui/PageTitle'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { UserStateOnly } from '@increaser/app/user/state/UserStateOnly'
import { ClientOnly } from '@increaser/app/ui/ClientOnly'
import { ManageProfile } from './ManageProfile'
import { Scoreboard } from '@increaser/ui/scoreboard/Scoreboard'
import { RequiresOnboarding } from '../../onboarding/RequiresOnboarding'
import { ProductFeaturesBoard } from '../../productFeatures/components/ProductFeaturesBoard'

export const CommunityPage: Page = () => {
  return (
    <FixedWidthContent>
      <ClientOnly>
        <PageTitle documentTitle={`👋 Community`} title="Community" />
      </ClientOnly>
      <UserStateOnly>
        <RequiresOnboarding>
          <HStack wrap="wrap" fullWidth gap={40}>
            <VStack style={{ width: 'fit-content' }} gap={40}>
              <ManageProfile />
              <Scoreboard />
            </VStack>
            <ProductFeaturesBoard />
          </HStack>
        </RequiresOnboarding>
      </UserStateOnly>
    </FixedWidthContent>
  )
}
