import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { ManageNotifications } from '@lib/ui/notifications/manage/ManageNotifications'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'

import { BreakNotificationsToggles } from './BreakNotificationsToggles'
import { useBreakNotificationsHaveSound } from './state/breakNotificationsHaveSound'

const Container = styled(ManageNotifications)`
  > * {
    &:first-child {
      ${horizontalPadding(8)};
    }
    background: ${getColor('foreground')};
  }
`

export const ManageBreakNotifications = () => {
  const [haveSound, setHaveSound] = useBreakNotificationsHaveSound()

  return (
    <Container
      height={40}
      isSoundEnabled={haveSound}
      setIsSoundEnabled={setHaveSound}
      title="Break notifications"
    >
      <BreakNotificationsToggles />
    </Container>
  )
}
