import { useStateCorrector } from '@lib/ui/state/useStateCorrector'
import {
  PersistentStateKey,
  usePersistentState,
} from '../../state/persistentState'
import { useActiveProjects } from '../hooks/useActiveProjects'
import { findBy } from '@lib/utils/array/findBy'

export const useProjectFilter = () => {
  const activeProjects = useActiveProjects()

  return useStateCorrector(
    usePersistentState<string | null>(PersistentStateKey.ProjectFilter, null),
    (value) => {
      if (value && !findBy(activeProjects, 'id', value)) {
        return null
      }

      return value
    },
  )
}
