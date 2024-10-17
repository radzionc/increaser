import {
  WebsiteSectionHeader,
  WebsiteSectionHeaderProps,
} from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import styled from 'styled-components'
import { VStack } from '@lib/ui/css/stack'
import { getDemoSliceCopy } from './getDemoSliceCopy'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { DemoGuard } from '../../demo/DemoGuard'
import { ManageProjects } from '@increaser/ui/projects/ManageProjects'

const Content = styled(VStack)`
  max-width: 400px;
  width: 100%;
`

export const ProjectsBudgetSlice = (
  props: Partial<WebsiteSectionHeaderProps>,
) => {
  const id = 'timePlanner'
  return (
    <WebsiteSlice>
      <WebsiteSliceContent>
        <WebsiteSectionHeader {...getDemoSliceCopy(id)} {...props} />
        <Content>
          <DemoGuard>
            <ManageProjects />
          </DemoGuard>
        </Content>
      </WebsiteSliceContent>
    </WebsiteSlice>
  )
}
