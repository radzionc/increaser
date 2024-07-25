import { EntityWithId } from '@lib/utils/entities/EntityWithId'

export type Principle = EntityWithId & {
  name: string
  description: string
  categoryId: string
  updatedAt: number
}
