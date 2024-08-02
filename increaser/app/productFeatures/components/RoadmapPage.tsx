import { Page } from '@lib/next-ui/Page'

import { PageContainer } from '@increaser/app/ui/page/PageContainer'
import { PageContent } from '@increaser/app/ui/page/PageContent'
import { PageTitle } from '@increaser/app/ui/page/PageTitle'
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

const title = `Roadmap`

const contentWidth = 520
const gap = 40
// const educationMinWidth = 280

const Content = styled(HStack)`
  width: 100%;
  gap: ${toSizeUnit(gap)};
  align-items: start;
`

const SideContent = styled(PageContent)`
  position: sticky;
  top: 0;
`

export const RoadmapPage: Page = () => {
  return (
    <PageContainer>
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
                <ProductFeatureList />
              </VStack>
            </UserStateOnly>
          </ProductFeaturesViewProvider>
        </PageContent>
        <UserStateOnly>
          <SideContent>
            <PageTitle>Request a Feature</PageTitle>
            <FeatureForm />
            <FounderContacts />
          </SideContent>
        </UserStateOnly>
      </Content>
    </PageContainer>
  )
}
