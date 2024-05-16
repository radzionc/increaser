import { Project } from '@increaser/entities/Project'
import { unknownProjectEmoji } from '@increaser/entities/TrackedTime'
import { findBy } from '@lib/utils/array/findBy'

type GetProjectEmojiInput = {
  projects: Project[]
  id?: string | null
}

export const getProjectEmoji = ({
  projects,
  id,
}: GetProjectEmojiInput): string => {
  const project = findBy(projects, 'id', id)

  return project?.emoji ?? unknownProjectEmoji
}
