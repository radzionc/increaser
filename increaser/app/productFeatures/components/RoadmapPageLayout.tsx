import { PageContainer } from '@increaser/app/ui/page/PageContainer'
import { PageContent } from '@increaser/app/ui/page/PageContent'
import styled from 'styled-components'
import { HStack, VStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { ProductFeaturesViewProvider } from './ProductFeaturesView'
import { FeatureForm } from './form/FeatureForm'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { PageHeader } from '../../ui/page/header/PageHeader'
import { PagePrimaryNavigation } from '../../navigation/page/PagePrimaryNavigation'
import { PageTitle } from '@lib/ui/text/PageTitle'
import { ChildrenProp } from '@lib/ui/props'
import { AppPageLayout } from '../../ui/page/AppPageLayout'
import { panelDefaultPadding } from '@lib/ui/css/panel'

const contentWidth = 520
const gap = 40
const sideContentMinWidth = 280

const Content = styled(HStack)`
  width: 100%;
  gap: ${toSizeUnit(gap)};
  align-items: start;
`

const SideContainer = styled(PageContent)`
  position: sticky;
  top: 0;
`

const SideContent = () => (
  <VStack gap={24}>
    <FeatureForm />
  </VStack>
)

export const RoadmapPageLayout = ({ children }: ChildrenProp) => {
  return (
    <AppPageLayout>
      <ElementSizeAware
        render={({ setElement, size }) => {
          const isSmall =
            size && size.width - contentWidth - gap < sideContentMinWidth
          return (
            <PageContainer ref={setElement}>
              <Content>
                <PageContent style={{ maxWidth: contentWidth }}>
                  <ProductFeaturesViewProvider>
                    <PageHeader>
                      <PagePrimaryNavigation />
                    </PageHeader>

                    <VStack gap={20}>
                      {isSmall && <SideContent />}
                      {children}
                    </VStack>
                  </ProductFeaturesViewProvider>
                </PageContent>
                {!isSmall && (
                  <SideContainer style={{ gap: 0 }}>
                    <PageHeader>
                      <PageTitle style={{ paddingLeft: panelDefaultPadding }}>
                        Request a Feature
                      </PageTitle>
                    </PageHeader>
                    <SideContent />
                  </SideContainer>
                )}
              </Content>
            </PageContainer>
          )
        }}
      />
    </AppPageLayout>
  )
}
