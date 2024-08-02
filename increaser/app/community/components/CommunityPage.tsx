import { Page } from '@lib/next-ui/Page'
import { UserStateOnly } from '@increaser/app/user/state/UserStateOnly'
import { Scoreboard } from '@increaser/ui/scoreboard/Scoreboard'
import { PageContainer } from '../../ui/page/PageContainer'
import { PageContent } from '../../ui/page/PageContent'
import { PageDocumentTitle } from '../../ui/page/PageDocumentTitle'
import { PageTitle } from '@increaser/app/ui/page/PageTitle'

const title = `Community`

const maxWidth = 440

export const CommunityPage: Page = () => {
  return (
    <PageContainer>
      <PageContent style={{ maxWidth }}>
        <PageTitle>{title}</PageTitle>
        <PageDocumentTitle emoji="👋" title={title} />
        <UserStateOnly>
          <Scoreboard />
        </UserStateOnly>
      </PageContent>
    </PageContainer>
  )
}
