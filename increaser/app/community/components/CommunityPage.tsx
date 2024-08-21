import { Page } from '@lib/next-ui/Page'
import { UserStateOnly } from '@increaser/app/user/state/UserStateOnly'
import { Scoreboard } from '@increaser/ui/scoreboard/Scoreboard'
import { PageContainer } from '../../ui/page/PageContainer'
import { PageContent } from '../../ui/page/PageContent'
import { PagePrimaryNavigation } from '../../navigation/page/PagePrimaryNavigation'
import { PageHeader } from '../../ui/page/header/PageHeader'

export const CommunityPage: Page = () => {
  return (
    <PageContainer>
      <PageContent>
        <PageHeader>
          <PagePrimaryNavigation />
        </PageHeader>
        <UserStateOnly>
          <Scoreboard />
        </UserStateOnly>
      </PageContent>
    </PageContainer>
  )
}
