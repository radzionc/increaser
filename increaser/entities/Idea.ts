import { EntityWithId } from '@lib/utils/entities/EntityWithId'
import { EntityWithName } from '@lib/utils/entities/EntityWithName'
import { ProjectRelatedEntity } from './Project'

export type Idea = EntityWithId &
  ProjectRelatedEntity &
  EntityWithName & {
    updatedAt: number
    description: string
  }

export type Ideas = Record<string, Idea>
