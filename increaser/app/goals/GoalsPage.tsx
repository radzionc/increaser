import { ClientOnly } from '@lib/ui/base/ClientOnly'
import { PageContainer } from '../ui/page/PageContainer'
import { PageContent } from '../ui/page/PageContent'
import { PageTitle } from '@lib/ui/text/PageTitle'

import { UserStateOnly } from '../user/state/UserStateOnly'
import { Goals } from './Goals'
import { GoalStatusFilter } from '@increaser/ui/goals/filter/GoalStatusFilter'
import styled from 'styled-components'
import { HStack } from '@lib/ui/layout/Stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { PageDocumentTitle } from '../ui/page/PageDocumentTitle'
import { GoalsEducation } from '@increaser/ui/goals/education/GoalsEducation'
import { Header } from '@lib/ui/layout/Header'

const title = 'Goals'

const contentWidth = 560
const gap = 20
const educationMinWidth = 280

const Content = styled(HStack)`
  width: 100%;
  gap: ${toSizeUnit(gap)};
`

export const GoalsPage = () => {
  return (
    <ElementSizeAware
      render={({ setElement, size }) => (
        <PageContainer ref={setElement}>
          <Content>
            <PageContent style={{ maxWidth: contentWidth }}>
              <Header>
                <PageTitle>{title}</PageTitle>
                <PageDocumentTitle emoji="🎯" title={title} />
                <ClientOnly>
                  <GoalStatusFilter />
                </ClientOnly>
              </Header>

              <UserStateOnly>
                <Goals />
              </UserStateOnly>
            </PageContent>
            {size && size.width - contentWidth - gap >= educationMinWidth && (
              <ClientOnly>
                <GoalsEducation />
              </ClientOnly>
            )}
          </Content>
        </PageContainer>
      )}
    />
  )
}
