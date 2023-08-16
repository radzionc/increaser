import { PersistentStorageKey } from 'state/persistentStorage'
import { usePersistentState } from 'state/persistentStorage'
import { useAssertUserState } from 'user/state/UserStateContext'

import { FocusSoundsState } from './FocusSoundsContext'

export type FocusSoundsPersistentState = Pick<
  FocusSoundsState,
  'isEnabled' | 'activeSoundUrl' | 'isPlaying'
>

export const useFocusSoundsState = () => {
  const { focusSounds } = useAssertUserState()
  return usePersistentState<FocusSoundsPersistentState>(
    PersistentStorageKey.FocusSounds,
    {
      isEnabled: true,
      activeSoundUrl: focusSounds[0]?.url,
      isPlaying: true,
    },
  )
}
