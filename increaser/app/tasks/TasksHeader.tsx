import { HStack } from '@lib/ui/layout/Stack'

import { Header } from '@lib/ui/layout/Header'
import { PageViewNavigation } from '../navigation/page/PageViewNavigation'
import { PageTitle } from '@lib/ui/text/PageTitle'
import { ManageProjectFilter } from '@increaser/ui/projects/filter/ManageProjectFilter'
import { UserStateOnly } from '../user/state/UserStateOnly'
import { useCurrentPageView } from '../navigation/hooks/useCurrentPageView'
import { TasksViewSelector } from '@increaser/ui/tasks/view/TasksViewSelector'

export const TasksHeader = () => {
  const view = useCurrentPageView('tasks')
  return (
    <Header
      gap={20}
      fullWidth
      alignItems="center"
      justifyContent="space-between"
      wrap="wrap"
    >
      <PageTitle as="div">
        <PageViewNavigation />
      </PageTitle>
      {view === 'tasks' && (
        <UserStateOnly>
          <HStack alignItems="center" gap={8}>
            <ManageProjectFilter />
            <TasksViewSelector />
          </HStack>
        </UserStateOnly>
      )}
    </Header>
  )
}
