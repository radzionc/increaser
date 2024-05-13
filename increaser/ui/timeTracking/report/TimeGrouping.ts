import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'

export const timeGroupings = ['day', 'week', 'month'] as const
export type TimeGrouping = (typeof timeGroupings)[number]

export const formatTimeGrouping = (grouping: TimeGrouping) =>
  `${capitalizeFirstLetter(grouping)}s`

export type TimeFrame = number | null

export const timeFrames: Record<TimeGrouping, TimeFrame[]> = {
  day: [7, 14, 30],
  week: [4, 8, 12, null],
  month: [4, 8, 12, null],
}
