import {
  WebsiteSectionHeader,
  WebsiteSectionHeaderProps,
} from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { ClientOnly } from '@lib/ui/base/ClientOnly'
import styled from 'styled-components'
import { VStack } from '@lib/ui/layout/Stack'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { getDemoSliceCopy } from './getDemoSliceCopy'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { TaskBoard } from '@increaser/ui/tasks/board/TaskBoard'
import { ProjectFilterProvider } from '@increaser/ui/projects/filter/ProjectFilterProvider'

const Content = styled(VStack)`
  width: 100%;
  height: 680px;
`

export const TasksSlice = (props: Partial<WebsiteSectionHeaderProps>) => {
  const { tasks } = useAssertUserState()

  const id = 'tasks'

  return (
    <WebsiteSlice id={id}>
      <WebsiteSliceContent>
        <WebsiteSectionHeader {...getDemoSliceCopy(id)} {...props} />
        <ClientOnly>
          <ProjectFilterProvider initialValue={null}>
            <Content>
              <TaskBoard />
            </Content>
          </ProjectFilterProvider>
        </ClientOnly>
      </WebsiteSliceContent>
    </WebsiteSlice>
  )
}
