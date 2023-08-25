import { Project } from 'projects/Project'
import { sum } from '@increaser/utils/sum'

export const getMinutesAllocatedToProjects = (projects: Project[]) =>
  sum(projects.map(({ allocatedMinutesPerWeek }) => allocatedMinutesPerWeek))
