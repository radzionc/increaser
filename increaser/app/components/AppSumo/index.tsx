import { FixedWidthContent } from '@increaser/app/components/reusable/fixed-width-content'
import { PageTitle } from '@increaser/app/ui/PageTitle'
import { UserStateOnly } from '@increaser/app/user/state/UserStateOnly'
import { Page } from '@lib/next-ui/Page'
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
