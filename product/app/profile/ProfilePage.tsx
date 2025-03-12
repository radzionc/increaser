import { Page } from '@lib/next-ui/Page'
import { VStack } from '@lib/ui/css/stack'
import { PageContainer } from '@product/app/ui/page/PageContainer'
import { PageContent } from '@product/app/ui/page/PageContent'

import { PagePrimaryNavigation } from '../navigation/page/PagePrimaryNavigation'
import { PageHeader } from '../ui/page/header/PageHeader'

import { ProfileForm } from './form/ProfileForm'
import { PayingUserGuard } from './PayingUserGuard'
import { ProfilePageToggle } from './ProfilePageToggle'

const maxWidth = 440

export const ProfilePage: Page = () => {
  return (
    <PageContainer>
      <PageContent style={{ maxWidth }}>
        <PageHeader>
          <PagePrimaryNavigation />
        </PageHeader>
        <VStack gap={12}>
          <ProfilePageToggle />
          <PayingUserGuard>
            <ProfileForm />
          </PayingUserGuard>
        </VStack>
      </PageContent>
    </PageContainer>
  )
}
