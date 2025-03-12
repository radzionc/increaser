import { useAnalytics } from '@lib/analytics-ui/AnalyticsContext'
import { useWindowEvent } from '@lib/ui/hooks/useEvent'
import { Modal } from '@lib/ui/modal'
import { ModalContent } from '@lib/ui/modal/ModalContent'
import { BeforeInstallPromptEvent } from '@lib/ui/pwa/BeforeInstallPromptEvent'
import { productName } from '@product/config'
import { PersistentStateKey } from '@product/ui/state/persistentState'
import { usePersistentState } from '@product/ui/state/persistentState'
import { useCallback, useState } from 'react'

import { PWAContext } from '../PWAContext'

import { InstallInstructions } from './InstallInstructions'

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

  useWindowEvent(
    'beforeinstallprompt',
    useCallback((event: BeforeInstallPromptEvent) => {
      event.preventDefault()
      setInstallPromptEvent(event as BeforeInstallPromptEvent)
    }, []),
  )

  const analytics = useAnalytics()

  useWindowEvent(
    'appinstalled',
    useCallback(() => {
      analytics.trackEvent('Finish Install')
      setInstallPromptEvent(null)
      setIsInstallModalOpen(false)
    }, [analytics]),
  )

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
          <ModalContent justifyContent="center" alignItems="center">
            <InstallInstructions />
          </ModalContent>
        </Modal>
      )}
    </PWAContext.Provider>
  )
}
