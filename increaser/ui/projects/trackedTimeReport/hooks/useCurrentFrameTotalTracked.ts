import { sum } from '@lib/utils/array/sum'
import { useOrderedProjects } from '../projects/useOrderedProjects'

export const useCurrentFrameTotalTracked = () => {
  const entries = useOrderedProjects()

  return sum(entries.map(({ value }) => value))
}
