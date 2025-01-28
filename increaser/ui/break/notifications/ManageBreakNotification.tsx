import { ValueProp } from '@lib/ui/props'
import {
  BreakNotification,
  breakNotificationDescription,
  breakNotificationEmoji,
  breakNotificationName,
  useBreakNotifications,
} from './state/breakNotifications'
import { DetailedNotificationToggle } from '@lib/ui/notifications/manage/DetailedNotificationToggle'

export const ManageBreakNotification = ({
  value,
}: ValueProp<BreakNotification>) => {
  const [notifications, setNotifications] = useBreakNotifications()

  return (
    <DetailedNotificationToggle
      value={notifications[value]}
      name={breakNotificationName[value]}
      emoji={breakNotificationEmoji[value]}
      description={breakNotificationDescription[value]}
      onChange={(isEnabled) => {
        setNotifications((prev) => ({
          ...prev,
          [value]: isEnabled,
        }))
      }}
    />
  )
}
