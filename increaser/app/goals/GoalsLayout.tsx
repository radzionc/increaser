import { PageContainer } from '../ui/page/PageContainer'
import { PageContent } from '../ui/page/PageContent'

import { ComponentWithChildrenProps } from '@lib/ui/props'
import { AppPageLayout } from '../focus/components/AppPageLayout'
import { PageHeader } from '../ui/page/header/PageHeader'
import { PageHeaderControlsAreaProvider } from '../ui/page/header/PageHeaderControlsAreaProvider'
import { HStack } from '@lib/ui/css/stack'
import styled from 'styled-components'
import { GoalsEducation } from '@increaser/ui/goals/education/GoalsEducation'
import { PagePrimaryNavigation } from '../navigation/page/PagePrimaryNavigation'

const SideSection = styled.div`
  flex: 1;
  min-width: 280px;
`

export const GoalsLayout = ({ children }: ComponentWithChildrenProps) => {
  return (
    <AppPageLayout>
      <PageContainer>
        <HStack style={{ position: 'relative' }} fullWidth wrap="wrap" gap={40}>
          <PageContent style={{ maxWidth: 560 }}>
            <PageHeaderControlsAreaProvider>
              <PageHeader>
                <PagePrimaryNavigation />
              </PageHeader>
              {children}
            </PageHeaderControlsAreaProvider>
          </PageContent>
          <SideSection>
            <GoalsEducation />
          </SideSection>
        </HStack>
      </PageContainer>
    </AppPageLayout>
  )
}
