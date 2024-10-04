import {
  WebsiteSectionHeader,
  WebsiteSectionHeaderProps,
} from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { ClientOnly } from '@lib/ui/base/ClientOnly'
import styled from 'styled-components'
import { ManageProjectsBudget } from '@increaser/ui/projects/budget/ManageProjectsBudget'
import { VStack } from '@lib/ui/css/stack'
import { getDemoSliceCopy } from './getDemoSliceCopy'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { DemoGuard } from '../../demo/DemoGuard'

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
            <ManageProjectsBudget />
          </DemoGuard>
        </Content>
      </WebsiteSliceContent>
    </WebsiteSlice>
  )
}
