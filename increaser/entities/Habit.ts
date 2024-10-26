import { EntityWithColor } from '@lib/utils/entities/EntityWithColor'
import { EntityWithEmoji } from '@lib/utils/entities/EntityWithEmoji'
import { EntityWithId } from '@lib/utils/entities/EntityWithId'
import { EntityWithName } from '@lib/utils/entities/EntityWithName'
import { EntityWithOrder } from '@lib/utils/entities/EntityWithOrder'
import { EntityWithStartDate } from '@lib/utils/entities/EntityWithStartDate'

export type Habit = EntityWithId &
  EntityWithName &
  EntityWithEmoji &
  EntityWithColor &
  EntityWithOrder & {
    startedAt?: number | null
    successes: string[]
  }

export type ActiveHabit = Omit<Habit, 'startedAt'> & EntityWithStartDate

export type InactiveHabit = Omit<Habit, 'startedAt'>
