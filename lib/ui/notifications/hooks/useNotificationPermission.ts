import { useState, useEffect } from 'react'

export function useNotificationPermission(): NotificationPermission {
  const [permission, setPermission] = useState<NotificationPermission>(
    Notification.permission,
  )

  useEffect(() => {
    let isMounted = true
    let permissionStatus: PermissionStatus

    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions
        .query({ name: 'notifications' as PermissionName })
        .then((status) => {
          permissionStatus = status
          if (isMounted) {
            setPermission(status.state as NotificationPermission)
          }

          // Listen for changes to the permission status
          permissionStatus.onchange = () => {
            if (isMounted) {
              setPermission(permissionStatus.state as NotificationPermission)
            }
          }
        })
        .catch((error) => {
          console.error('Error querying notification permissions:', error)
        })
    } else {
      // Permissions API is not supported
      console.warn('Permissions API is not supported by this browser.')
      // Without timers, we cannot listen for changes in browsers that do not support the Permissions API.
      // The permission state will remain as the initial value.
    }

    return () => {
      isMounted = false
      if (permissionStatus && permissionStatus.onchange) {
        permissionStatus.onchange = null
      }
    }
  }, [])

  return permission
}
