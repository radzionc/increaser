import { Day } from '@lib/utils/time/Day'
import { Month } from '@lib/utils/time/Month'
import { Week } from '@lib/utils/time/Week'
import { Year } from '@lib/utils/time/Year'

export type EntityWithSeconds = {
  seconds: number
}

export type ProjectDay = Day & EntityWithSeconds

export type ProjectWeek = Week & EntityWithSeconds

export type ProjectMonth = Month & EntityWithSeconds

export type ProjectYear = Year & EntityWithSeconds
