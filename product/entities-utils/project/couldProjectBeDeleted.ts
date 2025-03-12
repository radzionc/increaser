import { otherProject } from '@product/entities/Project'

export const couldProjectBeDeleted = (projectId: string) =>
  projectId !== otherProject.id
