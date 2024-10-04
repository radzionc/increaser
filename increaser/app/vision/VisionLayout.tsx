import { ComponentWithChildrenProps } from '@lib/ui/props'
import { AppPageLayout } from '../focus/components/AppPageLayout'
import { PageContainer } from '../ui/page/PageContainer'
import { PageContent } from '../ui/page/PageContent'
import { PageHeader } from '../ui/page/header/PageHeader'
import { PagePrimaryNavigation } from '../navigation/page/PagePrimaryNavigation'
import { AddVisionAttribute } from '@increaser/ui/vision/AddVisionAttribute'

export const VisionLayout = ({ children }: ComponentWithChildrenProps) => {
  return (
    <AppPageLayout>
      <PageContainer>
        <PageContent>
          <PageHeader controls={<AddVisionAttribute />}>
            <PagePrimaryNavigation />
          </PageHeader>
          {children}
        </PageContent>
      </PageContainer>
    </AppPageLayout>
  )
}
