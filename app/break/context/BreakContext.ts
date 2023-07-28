import { createContext } from 'react'

export type BreakDuration = number | undefined | 'long'

interface BreakState {
  breakDuration: BreakDuration
  setBreakDuration: (value: BreakDuration) => void

  hasBrowserNotification: boolean
  setHasBrowserNotification: (value: boolean) => void

  hasSoundNotification: boolean
  setHasSoundNotification: (value: boolean) => void

  hasAutomaticBreak: boolean
  setHasAutomaticBreak: (value: boolean) => void
}

export const BreakContext = createContext<BreakState | undefined>(undefined)
