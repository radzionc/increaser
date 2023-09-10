import { useCallback } from 'react'
import { SetsManagerContext } from 'sets/context/SetsManagerContext'
import { areSameSets } from 'sets/helpers/areSameSets'
import { getSetHash } from 'sets/helpers/getSetHash'
import { Set } from 'sets/Set'
import { useOnWindowCloseAlert } from '@increaser/ui/hooks/useOnWindowCloseAlert'
import { ComponentWithChildrenProps } from '@increaser/ui/props'
import { PersistentStateKey } from 'state/persistentStorage'
import { usePersistentState } from 'state/persistentStorage'
import { useAssertUserState, useUserState } from 'user/state/UserStateContext'

import { SyncSet } from './SyncSet'

export const SetsManagerProvider = ({
  children,
}: ComponentWithChildrenProps) => {
  const [unsyncedSets, setUnsyncedSets] = usePersistentState<Set[]>(
    PersistentStateKey.UnsyncedSets,
    [],
  )

  const shouldSync = unsyncedSets.length > 0
  useOnWindowCloseAlert('You have unsynced sessions', shouldSync)

  const { sets } = useAssertUserState()
  const { updateState } = useUserState()

  const create = useCallback(
    (set: Set) => {
      updateState({ sets: [...sets, set] })

      setUnsyncedSets([...unsyncedSets, set])
    },
    [setUnsyncedSets, sets, unsyncedSets, updateState],
  )

  return (
    <SetsManagerContext.Provider value={{ create }}>
      {unsyncedSets.map((set) => (
        <SyncSet
          key={getSetHash(set)}
          set={set}
          onSuccess={() => {
            setUnsyncedSets(unsyncedSets.filter((us) => !areSameSets(us, set)))
          }}
        />
      ))}
      {children}
    </SetsManagerContext.Provider>
  )
}
