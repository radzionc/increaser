import { Page } from '@lib/next-ui/Page'
import { ScoreboardContent } from '@product/ui/scoreboard/ScoreboardContent'
import styled from 'styled-components'

import { PagePrimaryNavigation } from '../../navigation/page/PagePrimaryNavigation'
import { PageHeader } from '../../ui/page/header/PageHeader'
import { PageContainer } from '../../ui/page/PageContainer'
import { PageContent } from '../../ui/page/PageContent'

const Content = styled.div`
  width: 100%;
  max-width: 400px;
`

export const CommunityPage: Page = () => {
  return (
    <PageContainer>
      <PageContent>
        <PageHeader>
          <PagePrimaryNavigation />
        </PageHeader>
        <Content>
          <ScoreboardContent />
        </Content>
      </PageContent>
    </PageContainer>
  )
}
