import { otherProject } from '@increaser/entities/Project'

export const couldProjectStatusBeChanged = (projectId: string) =>
  projectId !== otherProject.id
