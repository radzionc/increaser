import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'

export const taskTimeGroupings = ['day', 'week'] as const
export type TaskTimeGrouping = (typeof taskTimeGroupings)[number]

export const formatTaskTimeGrouping = (grouping: TaskTimeGrouping) =>
  `${capitalizeFirstLetter(grouping)}s`
