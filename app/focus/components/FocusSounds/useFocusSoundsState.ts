import { PersistentStorageKey } from 'state/persistentStorage'
import { usePersistentStorageValue } from 'state/persistentStorage'
import { useAssertUserState } from 'user/state/UserStateContext'

import { FocusSoundsState } from './FocusSoundsContext'

export type FocusSoundsPersistentState = Pick<
  FocusSoundsState,
  'isEnabled' | 'activeSoundUrl' | 'isPlaying'
>

export const useFocusSoundsState = () => {
  const { focusSounds } = useAssertUserState()
  return usePersistentStorageValue<FocusSoundsPersistentState>(
    PersistentStorageKey.FocusSounds,
    {
      isEnabled: true,
      activeSoundUrl: focusSounds[0]?.url,
      isPlaying: true,
    },
  )
}
