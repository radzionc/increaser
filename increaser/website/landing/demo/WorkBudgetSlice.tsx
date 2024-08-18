import {
  WebsiteSectionHeader,
  WebsiteSectionHeaderProps,
} from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { ClientOnly } from '@lib/ui/base/ClientOnly'
import { ManageWorkBudget } from '@increaser/ui/workBudget/ManageWorkBudget'
import { UniformColumnGrid } from '@lib/ui/css/uniformColumnGrid'
import styled from 'styled-components'
import { WorkBudgetDaysReport } from '@increaser/ui/workBudget/WorkBudgetDaysReport'
import { WorkBudgetWeeksReport } from '@increaser/ui/workBudget/WorkBudgetWeeksReport'
import { SeparatedByLine } from '@lib/ui/layout/SeparatedByLine'
import { Panel } from '@lib/ui/panel/Panel'
import { getDemoSliceCopy } from './getDemoSliceCopy'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'

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
        <ClientOnly>
          <Content minChildrenWidth={320} gap={40}>
            <ManageWorkBudget />
            <Panel kind="secondary">
              <SeparatedByLine gap={24}>
                <WorkBudgetDaysReport />
                <WorkBudgetWeeksReport />
              </SeparatedByLine>
            </Panel>
          </Content>
        </ClientOnly>
      </WebsiteSliceContent>
    </WebsiteSlice>
  )
}
