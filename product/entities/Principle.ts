import { EntityWithId } from '@lib/utils/entities/EntityWithId'
import { EntityWithName } from '@lib/utils/entities/EntityWithName'

export type Principle = EntityWithId &
  EntityWithName & {
    description: string
    categoryId: string
    updatedAt: number
  }
