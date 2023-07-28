import { Project } from 'projects/Project'
import { shouldBeNewBlock } from 'sets/Block'
import { Set } from 'sets/Set'
import { getLast } from 'shared/utils/getLast'

interface SuggestProjectParams {
  projects: Project[]
  todaySets: Set[]
}

export const suggestProject = ({
  projects,
  todaySets,
}: SuggestProjectParams) => {
  if (!projects.length) return null

  const willBeNewBlock = shouldBeNewBlock({
    timestamp: Date.now(),
    sets: todaySets,
  })

  if (!willBeNewBlock) {
    const lastSetProjectId = getLast(todaySets).projectId
    if (projects.find(({ id }) => id === lastSetProjectId)) {
      return lastSetProjectId
    }
  }

  return projects[0].id
}
