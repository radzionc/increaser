import { ManageNotifications } from '@lib/ui/notifications/manage/ManageNotifications'

import { FocusNotificationsToggles } from './FocusNotificationsToggles'
import { useFocusNotificationsHaveSound } from './state/focusNotificationsHaveSound'

export const ManageFocusNotifications = () => {
  const [haveSound, setHaveSound] = useFocusNotificationsHaveSound()

  return (
    <ManageNotifications
      isSoundEnabled={haveSound}
      setIsSoundEnabled={setHaveSound}
      title="Focus notifications"
    >
      <FocusNotificationsToggles />
    </ManageNotifications>
  )
}
