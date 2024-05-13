import { WebsiteSectionHeader } from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { ClientOnly } from '@lib/ui/base/ClientOnly'
import styled from 'styled-components'
import { TasksManagerProvider } from '@increaser/ui/tasks/TasksManagerProvider'
import { VStack } from '@lib/ui/layout/Stack'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { TaskPrimaryContent } from '@increaser/ui/tasks/TaskPrimaryContent'
import { CurrentTaskProvider } from '@increaser/ui/tasks/CurrentTaskProvider'
import { TaskCheckBox } from '@increaser/ui/tasks/TaskCheckBox'
import { TaskItemFrame } from '@increaser/ui/tasks/TaskItemFrame'

const Content = styled(VStack)`
  max-width: 460px;
  width: 100%;
`

export const TasksSlice = () => {
  const { tasks } = useAssertUserState()

  return (
    <WebsiteSliceContent>
      <WebsiteSectionHeader
        title="Stay on Top of Your To-Do List"
        subtitle="Stay organized and never miss a deadline again by prioritizing your daily tasks"
      />
      <ClientOnly>
        <Content>
          <TasksManagerProvider>
            {Object.values(tasks).map((task) => (
              <CurrentTaskProvider key={task.id} value={task}>
                <TaskItemFrame>
                  <TaskCheckBox />
                  <TaskPrimaryContent />
                </TaskItemFrame>
              </CurrentTaskProvider>
            ))}
          </TasksManagerProvider>
        </Content>
      </ClientOnly>
    </WebsiteSliceContent>
  )
}
