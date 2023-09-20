import { usePersistentState, PersistentStateKey } from 'state/persistentState'

export const useAuthTokenExpirationTime = () => {
  return usePersistentState<number | undefined>(
    PersistentStateKey.AuthTokenExpirationTime,
    undefined,
  )
}
