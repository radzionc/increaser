export const getNotificationPermission = () => window?.Notification?.permission

export const isNotificationAllowed = () =>
  getNotificationPermission() === 'granted'

export const isNotificationBlocked = () =>
  getNotificationPermission() === 'denied'

export const showNotification = (text: string) => {
  if (!isNotificationAllowed()) return

  try {
    const notification = new window.Notification(text)
    notification.onclick = function () {
      window.focus()
      notification.close()
    }
  } catch (_) {
    window.navigator.serviceWorker.getRegistration().then((registration) => {
      if (registration) {
        registration.showNotification(text, {
          vibrate: [200, 100, 200, 100, 200, 100, 200],
          requireInteraction: true,
        })
      }
    })
  }
}
