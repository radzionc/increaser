import { UserStateOnly } from '@increaser/app/user/state/UserStateOnly'

import { FocusPageContent } from './FocusPageContent'
import { CurrentFocusGuard } from './CurrentFocusProvider'
import { Page } from '@lib/next-ui/Page'

export const FocusPage: Page = () => {
  return (
    <UserStateOnly>
      <CurrentFocusGuard>
        <FocusPageContent />
      </CurrentFocusGuard>
    </UserStateOnly>
  )
}
