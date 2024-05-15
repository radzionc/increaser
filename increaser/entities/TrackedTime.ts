import { Seconds } from '@lib/utils/time/types'

export const unknownProjectKey = 'unknown' as const
export const unknownProjectName = 'Unknown'
type UnknownProjectKey = typeof unknownProjectKey

type TrackedTimeProjectKey = string | UnknownProjectKey

export type TimeSpentOnProjects = Record<TrackedTimeProjectKey, Seconds>

export type TrackedTime = Record<string, TimeSpentOnProjects>
