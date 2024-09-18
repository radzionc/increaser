import { useFocusNotificationsHaveSound } from '../state/focusNotificationsHaveSound'
import { playSound } from '@lib/ui/notifications/utils/playSound'
import { useMutation } from '@tanstack/react-query'
import {
  FocusNotification,
  focusNotificationEmoji,
  focusNotificationText,
} from '../state/focusNotifications'

export const useShowFocusNotificationMutation = (value: FocusNotification) => {
  const [haveSound] = useFocusNotificationsHaveSound()

  return useMutation({
    mutationFn: async () => {
      const text = `${focusNotificationEmoji[value]} ${focusNotificationText[value]}`

      const notification = new window.Notification(text)
      notification.onclick = function () {
        window.focus()
        notification.close()
      }

      if (haveSound) {
        return playSound('audio/pristine-notificaiton.mp3')
      }
    },
  })
}
