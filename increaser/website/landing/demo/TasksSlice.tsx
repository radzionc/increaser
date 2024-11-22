import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import styled from 'styled-components'
import { VStack } from '@lib/ui/css/stack'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { DemoGuard } from '../../demo/DemoGuard'
import { TaskBoardDemo } from './TaskBoardDemo'
import { WebsiteSectionTitle } from '@lib/ui/website/WebsiteSectionTitle'

const Content = styled(VStack)`
  width: 100%;
  height: 680px;
`

export const TasksSlice = () => {
  const id = 'tasks'

  return (
    <WebsiteSlice id={id}>
      <WebsiteSliceContent>
        <WebsiteSectionTitle>
          Organize Your <strong>Tasks</strong> Like a Pro
        </WebsiteSectionTitle>
        <Content>
          <DemoGuard>
            <TaskBoardDemo />
          </DemoGuard>
        </Content>
      </WebsiteSliceContent>
    </WebsiteSlice>
  )
}
