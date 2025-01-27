import { useFocusNotificationsHaveSound } from './state/focusNotificationsHaveSound'
import { FocusNotificationsToggles } from './FocusNotificationsToggles'
import { ManageNotifications } from '@lib/ui/notifications/manage/ManageNotifications'

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
