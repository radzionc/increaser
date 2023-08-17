import { FixedWidthContent } from 'components/reusable/fixed-width-content'
import { PageTitle } from 'ui/PageTitle'
import { UserStateOnly } from 'user/state/UserStateOnly'
import { Page } from 'components/Page'
import { AppSumoPageContent } from './AppSumoPageContent'

const title = 'AppSumo Lifetime Deal'

export const AppSumoPage: Page = () => {
  return (
    <FixedWidthContent>
      <PageTitle title={title} documentTitle={`🌮 ${title}`} />
      <UserStateOnly>
        <AppSumoPageContent />
      </UserStateOnly>
    </FixedWidthContent>
  )
}
