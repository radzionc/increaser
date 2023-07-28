import { useEffect } from 'react'
import { useSnackbar } from 'ui/Snackbar/useSnackbar'

export const NetworkStateObserver = () => {
  const { showSnackbar } = useSnackbar()

  useEffect(() => {
    const onOffline = () => {
      showSnackbar({ text: 'You are offline' })
    }
    window.addEventListener('offline', onOffline)

    return window.removeEventListener('offline', onOffline)
  }, [showSnackbar])

  return null
}
