import { PersistentStateKey } from '@increaser/app/state/persistentState'
import { usePersistentState } from '@increaser/app/state/persistentState'
import { useAssertUserState } from '@increaser/app/user/state/UserStateContext'

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
