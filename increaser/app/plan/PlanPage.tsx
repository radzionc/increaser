import { FixedWidthContent } from '../components/reusable/fixed-width-content'
import { PageTitle } from '../ui/PageTitle'

import { TasksViewProvider } from '@increaser/ui/tasks/TasksView'
import { UserStateOnly } from '../user/state/UserStateOnly'
import { PlanPageContent } from './PlanPageContent'

const title = 'Start the day'

export const PlanPage = () => {
  return (
    <FixedWidthContent>
      <TasksViewProvider>
        <PageTitle documentTitle={`☕️ ${title}`} title={title} />
        <UserStateOnly>
          <PlanPageContent />
        </UserStateOnly>
      </TasksViewProvider>
    </FixedWidthContent>
  )
}
