import { Project } from '@increaser/entities/Project'
import { unknownProjectName } from '@increaser/entities/TrackedTime'
import { findBy } from '@lib/utils/array/findBy'

type GetProjectNameInput = {
  projects: Project[]
  id?: string | null
}

export const getProjectName = ({
  projects,
  id,
}: GetProjectNameInput): string => {
  const project = findBy(projects, 'id', id)

  return project?.name ?? unknownProjectName
}
