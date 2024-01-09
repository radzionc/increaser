import { createContext } from 'react'
import { createContextHook } from '@lib/ui/state/createContextHook'
import { DayMoment } from '@increaser/entities/DayMoments'

interface ScheduleState {
  updateDayMoment: (dayMoment: DayMoment, value: number) => void
}

export const ScheduleContext = createContext<ScheduleState | undefined>(
  undefined,
)

export const useSchedule = createContextHook(ScheduleContext, 'ScheduleContext')
