import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'

export const timeGroupings = ['day', 'week', 'month', 'year'] as const
export type TimeGrouping = (typeof timeGroupings)[number]

export const formatTimeGrouping = (grouping: TimeGrouping) =>
  `${capitalizeFirstLetter(grouping)}s`
