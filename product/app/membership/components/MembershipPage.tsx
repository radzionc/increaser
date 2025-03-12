import { UniformColumnGrid } from '@lib/ui/css/uniformColumnGrid'

import { PagePrimaryNavigation } from '../../navigation/page/PagePrimaryNavigation'
import { PageHeader } from '../../ui/page/header/PageHeader'
import { PageContainer } from '../../ui/page/PageContainer'
import { PageContent } from '../../ui/page/PageContent'

import { MembershipOverview } from './MembershipOverview'
import { MembershipPersuasion } from './MembershipPersuasion'

export const MembershipPage = () => {
  return (
    <PageContainer>
      <PageContent>
        <PageHeader>
          <PagePrimaryNavigation />
        </PageHeader>
        <UniformColumnGrid
          style={{ alignItems: 'start' }}
          gap={40}
          minChildrenWidth={320}
        >
          <MembershipOverview />
          <MembershipPersuasion />
        </UniformColumnGrid>
      </PageContent>
    </PageContainer>
  )
}
