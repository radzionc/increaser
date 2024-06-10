import {
  WebsiteSectionHeader,
  WebsiteSectionHeaderProps,
} from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { ClientOnly } from '@lib/ui/base/ClientOnly'
import styled from 'styled-components'
import { ManageProjectsBudget } from '@increaser/ui/projects/budget/ManageProjectsBudget'
import { VStack } from '@lib/ui/layout/Stack'
import { getDemoSliceCopy } from './getDemoSliceCopy'

const Content = styled(VStack)`
  max-width: 400px;
  width: 100%;
`

export const ProjectsBudgetSlice = (
  props: Partial<WebsiteSectionHeaderProps>,
) => {
  return (
    <WebsiteSliceContent>
      <WebsiteSectionHeader {...getDemoSliceCopy('timePlanner')} {...props} />
      <ClientOnly>
        <Content>
          <ManageProjectsBudget />
        </Content>
      </ClientOnly>
    </WebsiteSliceContent>
  )
}
