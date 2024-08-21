import { UserStateOnly } from '../../user/state/UserStateOnly'
import { MembershipOverview } from './MembershipOverview'
import { UniformColumnGrid } from '@lib/ui/css/uniformColumnGrid'
import { MembershipPersuasion } from './MembershipPersuasion'
import { PageContainer } from '../../ui/page/PageContainer'
import { PageHeader } from '../../ui/page/header/PageHeader'
import { PagePrimaryNavigation } from '../../navigation/page/PagePrimaryNavigation'
import { PageContent } from '../../ui/page/PageContent'

export const MembershipPage = () => {
  return (
    <PageContainer>
      <PageContent>
        <PageHeader>
          <PagePrimaryNavigation />
        </PageHeader>
        <UserStateOnly>
          <UniformColumnGrid
            style={{ alignItems: 'start' }}
            gap={40}
            minChildrenWidth={320}
          >
            <MembershipOverview />
            <MembershipPersuasion />
          </UniformColumnGrid>
        </UserStateOnly>
      </PageContent>
    </PageContainer>
  )
}
