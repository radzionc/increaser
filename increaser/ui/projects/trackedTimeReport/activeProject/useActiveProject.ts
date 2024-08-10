import {
  usePersistentState,
  PersistentStateKey,
} from '@increaser/ui/state/persistentState'
import { useStateCorrector } from '@lib/ui/state/useStateCorrector'
import { useTrackedTime } from '../state/TrackedTimeContext'

export const useActiveProject = () => {
  const { projects } = useTrackedTime()

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
