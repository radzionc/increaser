import { Seconds } from '@lib/utils/time/types'
import { ActivityKey } from './Activity'

export type TimeSpentOnActivitys = Record<ActivityKey, Seconds>

export type TrackedTime = Record<string, TimeSpentOnActivitys>
