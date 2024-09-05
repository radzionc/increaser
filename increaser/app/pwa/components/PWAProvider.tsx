import { useAnalytics } from '@lib/analytics-ui/AnalyticsContext'
import { useCallback, useEffect, useState } from 'react'
import { PersistentStateKey } from '@increaser/ui/state/persistentState'
import { usePersistentState } from '@increaser/ui/state/persistentState'
import { Modal } from '@lib/ui/modal'
import { VStack } from '@lib/ui/css/stack'

import { BeforeInstallPromptEvent, PWAContext } from '../PWAContext'
import { InstallInstructions } from './InstallInstructions'
import { productName } from '@increaser/config'

interface Props {
  children: React.ReactNode
}

export const PWAProvider = ({ children }: Props) => {
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false)

  const [installPromptEvent, setInstallPromptEvent] =
    useState<BeforeInstallPromptEvent | null>(null)

  const [rejectedAt, setRejectedAt] = usePersistentState<number | null>(
    PersistentStateKey.SidebarInstallPromptWasRejectedAt,
    null,
  )

  useEffect(() => {
    const handleBeforeInstallEvent = (event: Event) => {
      event.preventDefault()
      setInstallPromptEvent(event as BeforeInstallPromptEvent)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallEvent)

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallEvent,
      )
    }
  }, [])

  const analytics = useAnalytics()

  useEffect(() => {
    const handleAppInstalledEvent = () => {
      analytics.trackEvent('Finish Install')
      setInstallPromptEvent(null)
      setIsInstallModalOpen(false)
    }

    window.addEventListener('appinstalled', handleAppInstalledEvent)

    return () => {
      window.removeEventListener('appinstalled', handleAppInstalledEvent)
    }
  })

  const setIsSidebarInstallPromptRejected = useCallback(() => {
    setRejectedAt(Date.now())
  }, [setRejectedAt])

  return (
    <PWAContext.Provider
      value={{
        installPromptEvent,
        setInstallPromptEvent,
        isSidebarInstallPromptRejected: !!rejectedAt,
        setIsSidebarInstallPromptRejected,
      }}
    >
      {children}
      {isInstallModalOpen && (
        <Modal
          title={`Install ${productName}`}
          onClose={() => setIsInstallModalOpen(false)}
        >
          <VStack fullHeight justifyContent="center" alignItems="center">
            <InstallInstructions />
          </VStack>
        </Modal>
      )}
    </PWAContext.Provider>
  )
}
