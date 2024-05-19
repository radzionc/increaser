import { UserStateOnly } from '@increaser/app/user/state/UserStateOnly'

import { FocusPageContent } from './FocusPageContent'
import { Page } from '@lib/next-ui/Page'
import { CurrentFocusGuard } from '@increaser/ui/focus/CurrentFocusProvider'
import { VStack } from '@lib/ui/layout/Stack'
import { ManageFocusSet } from './ManageFocusSet'
import styled from 'styled-components'

const Container = styled(VStack)`
  width: 100%;
  height: 100%;
  gap: 20px;
`

export const FocusPage: Page = () => {
  return (
    <UserStateOnly>
      <CurrentFocusGuard>
        <Container>
          <ManageFocusSet />
          <FocusPageContent />
        </Container>
      </CurrentFocusGuard>
    </UserStateOnly>
  )
}
