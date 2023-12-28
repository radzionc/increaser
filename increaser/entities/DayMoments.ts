import { convertDuration } from '@lib/utils/time/convertDuration'
import { Minutes } from '@lib/utils/time/types'

export const dayMoments = [
  'wakeUpAt',
  'firstMealAt',
  'startWorkAt',
  'lastMealAt',
  'finishWorkAt',
  'goToBedAt',
] as const

export type DayMoment = (typeof dayMoments)[number]

export type DayMoments = Record<DayMoment, Minutes>

export const dayMomentShortName: Record<DayMoment, string> = {
  wakeUpAt: 'wake up',
  startWorkAt: 'start work',
  finishWorkAt: 'finish work',
  goToBedAt: 'go to bed',
  firstMealAt: 'first meal',
  lastMealAt: 'last meal',
}

export const dayMomentStep: Minutes = 30

export const dayMomentsDefaultValues: Record<DayMoment, Minutes> = {
  wakeUpAt: convertDuration(7, 'h', 'min'),
  startWorkAt: convertDuration(7, 'h', 'min') + dayMomentStep,
  firstMealAt: convertDuration(10, 'h', 'min'),
  finishWorkAt: convertDuration(17, 'h', 'min') + dayMomentStep,
  lastMealAt: convertDuration(18, 'h', 'min'),
  goToBedAt: convertDuration(22, 'h', 'min'),
}
