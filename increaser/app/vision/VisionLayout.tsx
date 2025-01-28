import { ChildrenProp } from '@lib/ui/props'
import { AppPageLayout } from '../ui/page/AppPageLayout'
import { PageContainer } from '../ui/page/PageContainer'
import { PageContent } from '../ui/page/PageContent'
import { PageHeader } from '../ui/page/header/PageHeader'
import { PagePrimaryNavigation } from '../navigation/page/PagePrimaryNavigation'
import { AddVisionAttribute } from '@increaser/ui/vision/AddVisionAttribute'
import styled from 'styled-components'

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
