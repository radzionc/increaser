import { UserStateOnly } from '@increaser/app/user/state/UserStateOnly'

import { FocusPageContent } from './FocusPageContent'
import { Page } from '@lib/next-ui/Page'
import { CurrentFocusGuard } from '@increaser/ui/focus/CurrentFocusProvider'
import { RequiresOnboarding } from '../../onboarding/RequiresOnboarding'

export const FocusPage: Page = () => {
  return (
    <UserStateOnly>
      <RequiresOnboarding>
        <CurrentFocusGuard>
          <FocusPageContent />
        </CurrentFocusGuard>
      </RequiresOnboarding>
    </UserStateOnly>
  )
}
