import { maxMonths, maxWeeks } from '@increaser/entities/User'
import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'

export const timeGroupings = ['day', 'week', 'month', 'year'] as const
export type TimeGrouping = (typeof timeGroupings)[number]

export const formatTimeGrouping = (grouping: TimeGrouping) =>
  `${capitalizeFirstLetter(grouping)}s`

export type TimeFrame = number | null

export const timeFrames: Record<TimeGrouping, TimeFrame[]> = {
  day: [7, 14, 30],
  week: [4, 8, 12, maxWeeks],
  month: [4, 8, 12, maxMonths],
  year: [5, 10, null],
}
