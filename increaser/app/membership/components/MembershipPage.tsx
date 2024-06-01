import { TasksViewProvider } from '@increaser/ui/tasks/TasksView'
import { FixedWidthContent } from '../../components/reusable/fixed-width-content'
import { PageTitle } from '../../ui/PageTitle'
import { UserStateOnly } from '../../user/state/UserStateOnly'
import { MembershipOverview } from './MembershipOverview'
import { MembershipPageTitle } from './MembershipPageTitle'
import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'
import { Panel } from '@lib/ui/panel/Panel'
import { MembershipPersuasion } from './MembershipPersuasion'

const title = 'Membership'

export const MembershipPage = () => {
  return (
    <FixedWidthContent>
      <TasksViewProvider>
        <PageTitle
          documentTitle={`👑 ${title}`}
          title={
            <UserStateOnly>
              <MembershipPageTitle />
            </UserStateOnly>
          }
        />
        <UserStateOnly>
          <UniformColumnGrid gap={40} minChildrenWidth={320}>
            <MembershipOverview />
            <Panel>
              <MembershipPersuasion />
            </Panel>
          </UniformColumnGrid>
        </UserStateOnly>
      </TasksViewProvider>
    </FixedWidthContent>
  )
}
