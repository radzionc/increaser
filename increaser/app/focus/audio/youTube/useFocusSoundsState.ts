import { PersistentStateKey } from '@increaser/app/state/persistentState'
import { usePersistentState } from '@increaser/app/state/persistentState'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'

import { FocusSoundsState } from './FocusSoundsContext'

export type FocusSoundsPersistentState = Pick<
  FocusSoundsState,
  'activeSoundUrl' | 'isPlaying'
>

export const useFocusSoundsState = () => {
  const { focusSounds } = useAssertUserState()
  return usePersistentState<FocusSoundsPersistentState>(
    PersistentStateKey.FocusSounds,
    {
      activeSoundUrl: focusSounds[0]?.url,
      isPlaying: true,
    },
  )
}
