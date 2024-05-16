import { otherProject } from '@increaser/entities/Project'

export const couldProjectBeDeleted = (projectId: string) =>
  projectId !== otherProject.id
