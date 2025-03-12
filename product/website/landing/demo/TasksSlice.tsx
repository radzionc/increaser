import { VStack } from '@lib/ui/css/stack'
import { WebsiteSectionTitle } from '@lib/ui/website/WebsiteSectionTitle'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import styled from 'styled-components'

import { DemoGuard } from '../../demo/DemoGuard'

import { TaskBoardDemo } from './TaskBoardDemo'

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
