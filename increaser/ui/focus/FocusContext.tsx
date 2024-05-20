import { Set } from '@increaser/entities/User'
import { createContext } from 'react'
import { createContextHook } from '@lib/ui/state/createContextHook'
import { FocusDuration } from '@increaser/entities/FocusDuration'

export type FocusTask = {
  id: string
  startedAt: number
}

export interface StartFocusParams {
  projectId: string
  taskId?: string
  duration?: number
}

export interface CurrentSet {
  projectId: string
  startedAt: number
  task?: FocusTask
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
  updateTask: (value: FocusTask | undefined) => void

  setFocusDuration: (duration: FocusDuration) => void
  focusDuration: FocusDuration

  setHasTimerSoundNotification: (value: boolean) => void
  hasTimerSoundNotification: boolean

  setHasTimerBrowserNotification: (value: boolean) => void
  hasTimerBrowserNotification: boolean
}

export const FocusContext = createContext<FocusState | undefined>(undefined)

export const useFocus = createContextHook(FocusContext, 'FocusContext')
