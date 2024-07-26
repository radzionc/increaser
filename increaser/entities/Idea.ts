import { EntityWithId } from '@lib/utils/entities/EntityWithId'
import { EntityWithName } from '@lib/utils/entities/EntityWithName'

export type Idea = EntityWithId &
  EntityWithName & {
    updatedAt: number
    description: string
    projectId: string
  }

export type Ideas = Record<string, Idea>
