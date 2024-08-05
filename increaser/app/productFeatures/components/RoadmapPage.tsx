import { Page } from '@lib/next-ui/Page'

import { PageContainer } from '@increaser/app/ui/page/PageContainer'
import { PageContent } from '@increaser/app/ui/page/PageContent'
import { PageTitle } from '@lib/ui/text/PageTitle'

import { PageDocumentTitle } from '@increaser/app/ui/page/PageDocumentTitle'
import { UserStateOnly } from '@increaser/app/user/state/UserStateOnly'
import styled from 'styled-components'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import {
  ProductFeaturesViewProvider,
  ProductFeaturesViewSelector,
} from './ProductFeaturesView'
import { PageHeader } from '../../ui/page/PageHeader'
import { ClientOnly } from '@lib/ui/base/ClientOnly'
import { ProductFeatureList } from './ProductFeatureList'
import { FeatureForm } from './form/FeatureForm'
import { FounderContacts } from '../../community/components/FounderContacts'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'

const title = `Roadmap`

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

export const RoadmapPage: Page = () => {
  return (
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
                    <PageTitle>{title}</PageTitle>
                    <PageDocumentTitle emoji="🎯" title={title} />
                    <ClientOnly>
                      <ProductFeaturesViewSelector />
                    </ClientOnly>
                  </PageHeader>
                  <UserStateOnly>
                    <VStack gap={20}>
                      {isSmall && <SideContent />}
                      <ProductFeatureList />
                    </VStack>
                  </UserStateOnly>
                </ProductFeaturesViewProvider>
              </PageContent>
              {!isSmall && (
                <UserStateOnly>
                  <SideContainer>
                    <PageTitle>Request a Feature</PageTitle>
                    <SideContent />
                  </SideContainer>
                </UserStateOnly>
              )}
            </Content>
          </PageContainer>
        )
      }}
    />
  )
}
