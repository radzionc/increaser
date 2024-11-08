import {
  WebsiteSectionHeader,
  WebsiteSectionHeaderProps,
} from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { ManageWorkBudget } from '@increaser/ui/workBudget/ManageWorkBudget'
import { UniformColumnGrid } from '@lib/ui/css/uniformColumnGrid'
import styled from 'styled-components'
import { Panel } from '@lib/ui/css/panel'
import { getDemoSliceCopy } from './getDemoSliceCopy'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { DemoGuard } from '../../demo/DemoGuard'
import { CurrentWeekVsBudget } from '@increaser/ui/workBudget/CurrentWeekVsBudget'

const Content = styled(UniformColumnGrid)`
  max-width: 860px;
  width: 100%;
`

export const WorkBudgetSlice = (props: Partial<WebsiteSectionHeaderProps>) => {
  const id = 'workBudget'
  return (
    <WebsiteSlice>
      <WebsiteSliceContent>
        <WebsiteSectionHeader {...getDemoSliceCopy(id)} {...props} />
        <DemoGuard>
          <Content minChildrenWidth={320} gap={40}>
            <ManageWorkBudget />
            <Panel kind="secondary">
              <CurrentWeekVsBudget />
            </Panel>
          </Content>
        </DemoGuard>
      </WebsiteSliceContent>
    </WebsiteSlice>
  )
}
