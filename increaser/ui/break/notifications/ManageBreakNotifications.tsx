import { ManageNotifications } from '@lib/ui/notifications/manage/ManageNotifications'
import { useBreakNotificationsHaveSound } from './state/breakNotificationsHaveSound'
import styled from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'

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
      coming soon
    </Container>
  )
}
