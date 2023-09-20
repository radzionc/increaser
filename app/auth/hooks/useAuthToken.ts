import { usePersistentState, PersistentStateKey } from 'state/persistentState'

export const useAuthToken = () => {
  return usePersistentState<string | undefined>(
    PersistentStateKey.AuthToken,
    undefined,
  )
}
