import { Page } from '@lib/next-ui/Page'

import { PageContainer } from '@increaser/app/ui/page/PageContainer'
import { PageContent } from '@increaser/app/ui/page/PageContent'
import { PageTitle } from '@increaser/app/ui/page/PageTitle'
import { PageDocumentTitle } from '@increaser/app/ui/page/PageDocumentTitle'
import { UserStateOnly } from '@increaser/app/user/state/UserStateOnly'
import { PayingUserGuard } from './PayingUserGuard'
import { ProfilePageToggle } from './ProfilePageToggle'
import { VStack } from '@lib/ui/layout/Stack'
import { ProfileForm } from './form/ProfileForm'

const title = `Profile`

const maxWidth = 480

export const ProfilePage: Page = () => {
  return (
    <PageContainer>
      <PageContent style={{ maxWidth }}>
        <PageTitle>{title}</PageTitle>
        <PageDocumentTitle emoji="🎭" title={title} />
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
