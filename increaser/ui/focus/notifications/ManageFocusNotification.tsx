import { ComponentWithValueProps } from '@lib/ui/props'
import {
  FocusNotification,
  focusNotificationDescription,
  focusNotificationEmoji,
  focusNotificationName,
  useFocusNotifications,
} from './state/focusNotifications'
import { DetailedNotificationToggle } from '@lib/ui/notifications/manage/DetailedNotificationToggle'

export const ManageFocusNotification = ({
  value,
}: ComponentWithValueProps<FocusNotification>) => {
  const [notifications, setNotifications] = useFocusNotifications()

  return (
    <DetailedNotificationToggle
      value={notifications[value]}
      name={focusNotificationName[value]}
      emoji={focusNotificationEmoji[value]}
      description={focusNotificationDescription[value]}
      onChange={(isEnabled) => {
        setNotifications((prev) => ({
          ...prev,
          [value]: isEnabled,
        }))
      }}
    />
  )
}
