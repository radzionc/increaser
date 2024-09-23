import { ProjectRelatedEntity } from '@increaser/entities/Project'

export type IdeaFormShape = ProjectRelatedEntity & {
  name: string
  description: string
}
