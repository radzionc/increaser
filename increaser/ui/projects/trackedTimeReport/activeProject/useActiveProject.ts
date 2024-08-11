import {
  usePersistentState,
  PersistentStateKey,
} from '@increaser/ui/state/persistentState'
import { useStateCorrector } from '@lib/ui/state/useStateCorrector'
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
