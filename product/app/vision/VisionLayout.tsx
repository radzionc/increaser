import { ChildrenProp } from '@lib/ui/props'
import { AddVisionAttribute } from '@product/ui/vision/AddVisionAttribute'
import styled from 'styled-components'

import { PagePrimaryNavigation } from '../navigation/page/PagePrimaryNavigation'
import { AppPageLayout } from '../ui/page/AppPageLayout'
import { PageHeader } from '../ui/page/header/PageHeader'
import { PageContainer } from '../ui/page/PageContainer'
import { PageContent } from '../ui/page/PageContent'

const Container = styled(PageContainer)`
  max-width: initial;
`

export const VisionLayout = ({ children }: ChildrenProp) => {
  return (
    <AppPageLayout>
      <Container>
        <PageContent>
          <PageHeader controls={<AddVisionAttribute />}>
            <PagePrimaryNavigation />
          </PageHeader>
          {children}
        </PageContent>
      </Container>
    </AppPageLayout>
  )
}
