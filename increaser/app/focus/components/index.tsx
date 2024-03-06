import { UserStateOnly } from '@increaser/app/user/state/UserStateOnly'

import { FocusPageContent } from './FocusPageContent'
import { Page } from '@lib/next-ui/Page'
import { CurrentFocusGuard } from '@increaser/ui/focus/CurrentFocusProvider'

export const FocusPage: Page = () => {
  return (
    <UserStateOnly>
      <CurrentFocusGuard>
        <FocusPageContent />
      </CurrentFocusGuard>
    </UserStateOnly>
  )
}
