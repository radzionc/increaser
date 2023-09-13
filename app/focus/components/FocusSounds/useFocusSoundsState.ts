import { PersistentStateKey } from 'state/persistentState'
import { usePersistentState } from 'state/persistentState'
import { useAssertUserState } from 'user/state/UserStateContext'

import { FocusSoundsState } from './FocusSoundsContext'

export type FocusSoundsPersistentState = Pick<
  FocusSoundsState,
  'isEnabled' | 'activeSoundUrl' | 'isPlaying'
>

export const useFocusSoundsState = () => {
  const { focusSounds } = useAssertUserState()
  return usePersistentState<FocusSoundsPersistentState>(
    PersistentStateKey.FocusSounds,
    {
      isEnabled: true,
      activeSoundUrl: focusSounds[0]?.url,
      isPlaying: true,
    },
  )
}
