import { createContextHook } from '@lib/ui/state/createContextHook'
import { Interval } from '@lib/utils/interval/Interval'
import { createContext } from 'react'

type GoalsTimelineState = {
  interval: Interval
  dob: string
}

export const GoalsTimelinContext = createContext<
  GoalsTimelineState | undefined
>(undefined)

export const useGoalsTimeline = createContextHook(
  GoalsTimelinContext,
  'GoalsTimelinContext',
)
