import { EntityWithId } from '@lib/utils/entities/EntityWithId'

export type Note = EntityWithId & {
  updatedAt: number
  name: string
  description: string
  projectId: string
}

export type Notes = Record<string, Note>
