import { useCallback } from 'react'
import { SetsManagerContext } from 'sets/context/SetsManagerContext'
import { areSameSets } from 'sets/helpers/areSameSets'
import { getSetHash } from 'sets/helpers/getSetHash'
import { Set } from 'sets/Set'
import { useOnWindowCloseAlert } from 'shared/hooks/useOnWindowCloseAlert'
import { ComponentWithChildrenProps } from 'shared/props'
import { PersistentStorageKey } from 'state/persistentStorage'
import { usePersistentStorageValue } from 'state/persistentStorage'
import { useAssertUserState, useUserState } from 'user/state/UserStateContext'

import { SyncSet } from './SyncSet'
import { useMount } from 'react-use'

export const SetsManagerProvider = ({
  children,
}: ComponentWithChildrenProps) => {
  const [unsyncedSets, setUnsyncedSets] = usePersistentStorageValue<Set[]>(
    PersistentStorageKey.UnsyncedSets,
    [],
  )

  useMount(() => {
    console.log('Mount SetsManagerProvider')
  })

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
