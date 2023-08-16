import { trackEvent } from 'analytics'
import { useCallback, useEffect, useState } from 'react'
import { PersistentStorageKey } from 'state/persistentStorage'
import { usePersistentState } from 'state/persistentStorage'
import { Modal } from '@increaser/ui/ui/Modal'
import { VStack } from '@increaser/ui/ui/Stack'

import { BeforeInstallPromptEvent, PWAContext } from '../PWAContext'
import { InstallInstructions } from './InstallInstructions'

interface Props {
  children: React.ReactNode
}

export const PWAProvider = ({ children }: Props) => {
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false)

  const [installPromptEvent, setInstallPromptEvent] =
    useState<BeforeInstallPromptEvent | null>(null)

  const [rejectedAt, setRejectedAt] = usePersistentState<number | undefined>(
    PersistentStorageKey.SidebarInstallPromptWasRejectedAt,
    undefined,
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

  useEffect(() => {
    const handleAppInstalledEvent = () => {
      trackEvent('Finish Install')
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
          onClose={() => setIsInstallModalOpen(false)}
          renderContent={() => (
            <VStack fullHeight justifyContent="center" alignItems="center">
              <InstallInstructions />
            </VStack>
          )}
        />
      )}
    </PWAContext.Provider>
  )
}
