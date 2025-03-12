import { useStateCorrector } from '@lib/ui/state/useStateCorrector'
import {
  usePersistentState,
  PersistentStateKey,
} from '@product/ui/state/persistentState'

import { useTrackedProjects } from '../projects/TrackedProjectsProvider'

export const useActiveProject = () => {
  const projects = useTrackedProjects()

  return useStateCorrector(
    usePersistentState<string | null>(PersistentStateKey.ActiveProject, null),
    (state) => {
      if (state !== null && !projects[state]) {
        return null
      }
      return state
    },
  )
}
