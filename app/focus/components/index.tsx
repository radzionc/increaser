import { UserStateOnly } from 'user/state/UserStateOnly'

import { FocusPageContent } from './FocusPageContent'

export const FocusPage = () => {
  return (
    <UserStateOnly>
      <FocusPageContent />
    </UserStateOnly>
  )
}
