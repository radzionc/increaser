import { WebsiteSectionHeader } from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { ClientOnly } from '@lib/ui/base/ClientOnly'
import styled from 'styled-components'
import { ManageProjectsBudget } from '@increaser/ui/projects/budget/ManageProjectsBudget'
import { VStack } from '@lib/ui/layout/Stack'

const Content = styled(VStack)`
  max-width: 400px;
  width: 100%;
`

export const ProjectsBudgetSlice = () => {
  return (
    <WebsiteSlice>
      <WebsiteSliceContent>
        <WebsiteSectionHeader
          title="Balance Your Time, Boost Your Efficiency"
          subtitle="Ensure balanced attention across all your projects without burning out"
        />
        <ClientOnly>
          <Content>
            <ManageProjectsBudget />
          </Content>
        </ClientOnly>
      </WebsiteSliceContent>
    </WebsiteSlice>
  )
}
