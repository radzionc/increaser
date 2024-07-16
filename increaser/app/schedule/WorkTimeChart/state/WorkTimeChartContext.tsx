import { createContextHook } from '@lib/ui/state/createContextHook'
import { Interval } from '@lib/utils/interval/Interval'
import { createContext } from 'react'

type WorkTimeChartState = {
  startedAt: number
  days: Interval[]
}

export const WorkTimeChartContext = createContext<
  WorkTimeChartState | undefined
>(undefined)

export const useWorkTimeChart = createContextHook(
  WorkTimeChartContext,
  'useWorkTimeChart',
)
