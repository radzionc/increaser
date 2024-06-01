import { TasksViewProvider } from '@increaser/ui/tasks/TasksView'
import { FixedWidthContent } from '../../components/reusable/fixed-width-content'
import { PageTitle } from '../../ui/PageTitle'
import { UserStateOnly } from '../../user/state/UserStateOnly'
import { MembershipOverview } from './MembershipOverview'

const title = 'Membership'

export const MembershipPage = () => {
  return (
    <FixedWidthContent>
      <TasksViewProvider>
        <PageTitle documentTitle={`👑 ${title}`} title={title} />
        <UserStateOnly>
          <MembershipOverview />
        </UserStateOnly>
      </TasksViewProvider>
    </FixedWidthContent>
  )
}
