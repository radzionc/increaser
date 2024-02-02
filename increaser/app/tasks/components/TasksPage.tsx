import { FixedWidthContent } from '../../components/reusable/fixed-width-content'
import { PageTitle } from '../../ui/PageTitle'
import { UserStateOnly } from '../../user/state/UserStateOnly'
import { TasksView } from './TasksView'

export const TasksPage = () => {
  return (
    <FixedWidthContent>
      <PageTitle documentTitle={`✅ Tasks`} title="Tasks" />
      <UserStateOnly>
        <TasksView />
      </UserStateOnly>
    </FixedWidthContent>
  )
}
