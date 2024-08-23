import { PageContainer } from '@increaser/app/ui/page/PageContainer'
import { PageContent } from '@increaser/app/ui/page/PageContent'
import { UserStateOnly } from '@increaser/app/user/state/UserStateOnly'
import styled from 'styled-components'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { ProductFeaturesViewProvider } from './ProductFeaturesView'
import { FeatureForm } from './form/FeatureForm'
import { FounderContacts } from '../../community/components/FounderContacts'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { PageHeader } from '../../ui/page/header/PageHeader'
import { PagePrimaryNavigation } from '../../navigation/page/PagePrimaryNavigation'
import { PageTitle } from '@lib/ui/text/PageTitle'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { AppPageLayout } from '../../focus/components/AppPageLayout'
import { panelDefaultPadding } from '@lib/ui/panel/Panel'

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
    <FounderContacts />
  </VStack>
)

export const RoadmapPageLayout = ({ children }: ComponentWithChildrenProps) => {
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

                    <UserStateOnly>
                      <VStack gap={20}>
                        {isSmall && <SideContent />}
                        {children}
                      </VStack>
                    </UserStateOnly>
                  </ProductFeaturesViewProvider>
                </PageContent>
                {!isSmall && (
                  <UserStateOnly>
                    <SideContainer style={{ gap: 0 }}>
                      <PageHeader>
                        <PageTitle style={{ paddingLeft: panelDefaultPadding }}>
                          Request a Feature
                        </PageTitle>
                      </PageHeader>
                      <SideContent />
                    </SideContainer>
                  </UserStateOnly>
                )}
              </Content>
            </PageContainer>
          )
        }}
      />
    </AppPageLayout>
  )
}
