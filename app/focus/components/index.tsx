import { UserStateOnly } from 'user/state/UserStateOnly'

import { FocusPageContent } from './FocusPageContent'
import { CurrentFocusGuard } from './CurrentFocusProvider'
import { Page } from 'layout/Page'

export const FocusPage: Page = () => {
  return (
    <UserStateOnly>
      <CurrentFocusGuard>
        <FocusPageContent />
      </CurrentFocusGuard>
    </UserStateOnly>
  )
}
