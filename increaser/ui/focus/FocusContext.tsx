import { Set } from '@increaser/entities/User'
import { createContext } from 'react'
import { createContextHook } from '@lib/ui/state/createContextHook'
import { Minutes } from '@lib/utils/time/types'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useFocusIntervals } from '@increaser/app/focus/hooks/useFocusIntervals'

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

export type StopFocusParams = {
  lastSetOverride?: Partial<Set>
}

interface FocusState {
  start: (params: StartFocusParams) => void

  reduceLastInterval: (duration: Minutes) => void

  pause: () => void
  resume: () => void

  stop: (params?: StopFocusParams) => void
  cancel: () => void
}

export const FocusContext = createContext<FocusState | undefined>(undefined)

export const useFocus = createContextHook(FocusContext, 'FocusContext')

export const useAssertFocusIntervals = () => {
  const [intervals] = useFocusIntervals()
  return shouldBePresent(intervals)
}
