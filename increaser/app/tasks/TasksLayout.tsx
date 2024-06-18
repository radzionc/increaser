import { ComponentWithChildrenProps } from '@lib/ui/props'
import { AppPageLayout } from '../focus/components/AppPageLayout'
import { PageTitle } from '../ui/PageTitle'
import { UserStateOnly } from '../user/state/UserStateOnly'
import { FixedWidthContent } from '../components/reusable/fixed-width-content'
import { TasksContainer } from '@increaser/ui/tasks/TasksContainer'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { TasksViewSelector } from './TasksViewSelector'

export const TasksLayout = ({ children }: ComponentWithChildrenProps) => {
  return (
    <AppPageLayout>
      <FixedWidthContent>
        <PageTitle documentTitle={`✅ Tasks`} title={<TasksViewSelector />} />
        <TasksContainer>
          <UserStateOnly>
            <ActiveItemIdProvider initialValue={null}>
              {children}
            </ActiveItemIdProvider>
          </UserStateOnly>
        </TasksContainer>
      </FixedWidthContent>
    </AppPageLayout>
  )
}
