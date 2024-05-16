import { Seconds } from '@lib/utils/time/types'

export type TimeRecord = Record<string, Seconds>

export type TrackedTime = Record<string, TimeRecord>
