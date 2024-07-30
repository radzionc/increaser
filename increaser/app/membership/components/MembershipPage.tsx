import { FixedWidthContent } from '../../components/reusable/fixed-width-content'
import { PageTitle } from '../../ui/PageTitle'
import { UserStateOnly } from '../../user/state/UserStateOnly'
import { MembershipOverview } from './MembershipOverview'
import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'
import { MembershipPersuasion } from './MembershipPersuasion'

const title = 'Membership'

export const MembershipPage = () => {
  return (
    <FixedWidthContent>
      <PageTitle documentTitle={`👑 ${title}`} title={title} />
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
    </FixedWidthContent>
  )
}
