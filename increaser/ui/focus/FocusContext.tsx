import { Set } from '@increaser/entities/User'
import { createContext } from 'react'
import { createContextHook } from '@lib/ui/state/createContextHook'
import { FocusDuration } from '@increaser/entities/FocusDuration'
import { Minutes } from '@lib/utils/time/types'

export interface StartFocusParams {
  projectId: string
  taskId: string | null
  duration?: number
  startedAt: number
}

export type FocusInterval = {
  projectId: string
  taskId: string | null
  start: number
  end: number | null
}

export type FocusSession = {
  intervals: FocusInterval[]
}

export type StopFocusParams = {
  lastSetOverride?: Partial<Set>
}

export interface FocusState {
  start: (params: StartFocusParams) => void

  reduceLastInterval: (duration: Minutes) => void

  pause: () => void
  resume: () => void

  stop: (params?: StopFocusParams) => void
  cancel: () => void

  session: FocusSession | null
  updateProject: (projectId: string) => void
  updateTask: (taskId: string | null) => void

  setFocusDuration: (duration: FocusDuration) => void
  focusDuration: FocusDuration
}

export const FocusContext = createContext<FocusState | undefined>(undefined)

export const useFocus = createContextHook(FocusContext, 'FocusContext')
