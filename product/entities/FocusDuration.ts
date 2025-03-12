import { getLastItem } from '@lib/utils/array/getLastItem'

export const focusDurations = [
  5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90,
] as const
export const maxFocusDuration = getLastItem(focusDurations)
export type FocusDuration = (typeof focusDurations)[number]
export const targetFocusDuration: FocusDuration = 90
export const pomodoroFocusDuration: FocusDuration = 25
