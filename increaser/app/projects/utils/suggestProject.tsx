import { getLastItem } from '@lib/utils/array/getLastItem'
import { shouldBeNewBlock } from '@increaser/app/sets/Block'
import { Set } from '@increaser/app/sets/Set'
import { EnhancedProject } from '@increaser/ui/projects/EnhancedProject'

interface SuggestProjectParams {
  projects: EnhancedProject[]
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
    const lastSetProjectId = getLastItem(todaySets).projectId
    if (projects.find(({ id }) => id === lastSetProjectId)) {
      return lastSetProjectId
    }
  }

  return projects[0].id
}
