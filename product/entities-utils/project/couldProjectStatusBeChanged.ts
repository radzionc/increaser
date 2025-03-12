import { otherProject } from '@product/entities/Project'

export const couldProjectStatusBeChanged = (projectId: string) =>
  projectId !== otherProject.id
