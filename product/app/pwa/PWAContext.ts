import { BeforeInstallPromptEvent } from '@lib/ui/pwa/BeforeInstallPromptEvent'
import { createContextHook } from '@lib/ui/state/createContextHook'
import { createContext } from 'react'

interface PWAState {
  installPromptEvent: null | BeforeInstallPromptEvent
  setInstallPromptEvent: (event: null | BeforeInstallPromptEvent) => void

  isSidebarInstallPromptRejected: boolean
  setIsSidebarInstallPromptRejected: (isRejected: boolean) => void
}

export const PWAContext = createContext<PWAState | undefined>(undefined)

export const usePWA = createContextHook(PWAContext, 'PWAContext')
