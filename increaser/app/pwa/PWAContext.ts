import { createContext } from 'react'
import { createContextHook } from '@lib/ui/state/createContextHook'

export interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
}

export interface PWAState {
  installPromptEvent: null | BeforeInstallPromptEvent
  setInstallPromptEvent: (event: null | BeforeInstallPromptEvent) => void

  isSidebarInstallPromptRejected: boolean
  setIsSidebarInstallPromptRejected: (isRejected: boolean) => void
}

export const PWAContext = createContext<PWAState | undefined>(undefined)

export const usePWA = createContextHook(PWAContext, 'PWAContext')
