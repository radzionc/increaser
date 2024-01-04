import { Set } from '@increaser/entities/User'
import { FocusDuration } from '@increaser/app/focus/FocusDuration'
import { createContext } from 'react'

export interface StartFocusParams {
  projectId: string
  duration?: number
}

export interface CurrentSet {
  projectId: string
  startedAt: number
}

export interface StopFocusParams {
  setOverride?: Partial<Set>
}

export interface FocusState {
  start: (params: StartFocusParams) => void
  stop: (params?: StopFocusParams) => void
  cancel: () => void

  currentSet: CurrentSet | undefined
  updateStartTime: (value: number) => void
  updateProject: (value: string) => void

  setFocusDuration: (duration: FocusDuration) => void
  focusDuration: FocusDuration

  setHasTimerSoundNotification: (value: boolean) => void
  hasTimerSoundNotification: boolean

  setHasTimerBrowserNotification: (value: boolean) => void
  hasTimerBrowserNotification: boolean
}

export const FocusContext = createContext<FocusState | undefined>(undefined)
