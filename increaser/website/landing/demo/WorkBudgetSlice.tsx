import {
  WebsiteSectionHeader,
  WebsiteSectionHeaderProps,
} from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { ClientOnly } from '@lib/ui/base/ClientOnly'
import { ManageWorkBudget } from '@increaser/ui/workBudget/ManageWorkBudget'
import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'
import styled from 'styled-components'
import { WorkBudgetDaysReport } from '@increaser/ui/workBudget/WorkBudgetDaysReport'
import { WorkBudgetWeeksReport } from '@increaser/ui/workBudget/WorkBudgetWeeksReport'
import { SeparatedByLine } from '@lib/ui/layout/SeparatedByLine'
import { Panel } from '@lib/ui/panel/Panel'
import { getDemoSliceCopy } from './getDemoSliceCopy'

const Content = styled(UniformColumnGrid)`
  max-width: 860px;
  width: 100%;
`

export const WorkBudgetSlice = (props: Partial<WebsiteSectionHeaderProps>) => {
  return (
    <WebsiteSliceContent>
      <WebsiteSectionHeader {...getDemoSliceCopy('workBudget')} {...props} />
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
  )
}
