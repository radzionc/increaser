import { FixedWidthContent } from '@increaser/app/components/reusable/fixed-width-content'

import { PageTitle } from '@increaser/app/ui/PageTitle'
import { Page } from '@lib/next-ui/Page'
import { UserStateOnly } from '../user/state/UserStateOnly'
import { TasksView } from './TasksView'

const title = 'My tasks'

export const TasksPage: Page = () => {
  return (
    <FixedWidthContent>
      <PageTitle documentTitle={`✅ ${title}`} title={title} />
      <UserStateOnly>
        <TasksView />
      </UserStateOnly>
    </FixedWidthContent>
  )
}
