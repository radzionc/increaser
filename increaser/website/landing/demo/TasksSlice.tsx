import {
  WebsiteSectionHeader,
  WebsiteSectionHeaderProps,
} from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import styled from 'styled-components'
import { VStack } from '@lib/ui/css/stack'
import { getDemoSliceCopy } from './getDemoSliceCopy'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { TaskBoard } from '@increaser/ui/tasks/board/TaskBoard'
import { DemoGuard } from '../../demo/DemoGuard'

const Content = styled(VStack)`
  width: 100%;
  height: 680px;
`

export const TasksSlice = (props: Partial<WebsiteSectionHeaderProps>) => {
  const id = 'tasks'

  return (
    <WebsiteSlice id={id}>
      <WebsiteSliceContent>
        <WebsiteSectionHeader {...getDemoSliceCopy(id)} {...props} />
        <Content>
          <DemoGuard>
            <TaskBoard />
          </DemoGuard>
        </Content>
      </WebsiteSliceContent>
    </WebsiteSlice>
  )
}
