import { EntityWithId } from '@lib/utils/entities/EntityWithId'

export type Habit = EntityWithId & {
  name: string
  emoji: string
  color: number
  startedAt: number
  successes: string[]
  order: number
}

export const habitDefaultFields = {
  successes: [],
}
