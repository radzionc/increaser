import {
  WebsiteSectionHeader,
  WebsiteSectionHeaderProps,
} from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { ClientOnly } from '@lib/ui/base/ClientOnly'
import styled from 'styled-components'
import { VStack } from '@lib/ui/layout/Stack'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { TaskPrimaryContent } from '@increaser/ui/tasks/TaskPrimaryContent'
import { CurrentTaskProvider } from '@increaser/ui/tasks/CurrentTaskProvider'
import { TaskCheckBox } from '@increaser/ui/tasks/TaskCheckBox'
import { TaskItemFrame } from '@increaser/ui/tasks/TaskItemFrame'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { getDemoSliceCopy } from './getDemoSliceCopy'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'

const Content = styled(VStack)`
  max-width: 460px;
  width: 100%;
`

export const TasksSlice = (props: Partial<WebsiteSectionHeaderProps>) => {
  const { tasks } = useAssertUserState()

  const id = 'tasks'

  return (
    <WebsiteSlice id={id}>
      <WebsiteSliceContent>
        <WebsiteSectionHeader {...getDemoSliceCopy(id)} {...props} />
        <ClientOnly>
          <Content>
            <ActiveItemIdProvider initialValue={null}>
              {Object.values(tasks).map((task) => (
                <CurrentTaskProvider key={task.id} value={task}>
                  <TaskItemFrame>
                    <TaskCheckBox />
                    <TaskPrimaryContent />
                  </TaskItemFrame>
                </CurrentTaskProvider>
              ))}
            </ActiveItemIdProvider>
          </Content>
        </ClientOnly>
      </WebsiteSliceContent>
    </WebsiteSlice>
  )
}
