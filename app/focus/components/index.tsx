import { UserStateOnly } from 'user/state/UserStateOnly'

import { FocusPageContent } from './FocusPageContent'
import { CurrentFocusGuard } from './CurrentFocusProvider'

export const FocusPage = () => {
  return (
    <UserStateOnly>
      <CurrentFocusGuard>
        <FocusPageContent />
      </CurrentFocusGuard>
    </UserStateOnly>
  )
}
