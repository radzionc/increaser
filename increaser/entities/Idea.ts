import { EntityWithId } from '@lib/utils/entities/EntityWithId'

export type Idea = EntityWithId & {
  updatedAt: number
  name: string
  description: string
  projectId: string
}

export type Ideas = Record<string, Idea>
