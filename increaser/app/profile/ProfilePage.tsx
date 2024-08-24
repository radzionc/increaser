import { Page } from '@lib/next-ui/Page'

import { PageContainer } from '@increaser/app/ui/page/PageContainer'
import { PageContent } from '@increaser/app/ui/page/PageContent'
import { UserStateOnly } from '@increaser/app/user/state/UserStateOnly'
import { PayingUserGuard } from './PayingUserGuard'
import { ProfilePageToggle } from './ProfilePageToggle'
import { VStack } from '@lib/ui/layout/Stack'
import { ProfileForm } from './form/ProfileForm'
import { PageHeader } from '../ui/page/header/PageHeader'
import { PagePrimaryNavigation } from '../navigation/page/PagePrimaryNavigation'

const maxWidth = 440

export const ProfilePage: Page = () => {
  return (
    <PageContainer>
      <PageContent style={{ maxWidth }}>
        <PageHeader>
          <PagePrimaryNavigation />
        </PageHeader>
        <UserStateOnly>
          <VStack gap={12}>
            <ProfilePageToggle />
            <PayingUserGuard>
              <ProfileForm />
            </PayingUserGuard>
          </VStack>
        </UserStateOnly>
      </PageContent>
    </PageContainer>
  )
}
