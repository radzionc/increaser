import {
  PersistentStateKey,
  usePersistentState,
} from '@product/ui/state/persistentState'

import { FocusSound } from '../../focusSounds'

type FocusSoundsPreference = Partial<Record<FocusSound, number>>

export const useFocusSoundsPreference = () => {
  return usePersistentState<FocusSoundsPreference>(
    PersistentStateKey.FocusSoundsPreference,
    {
      coffee: 0.8,
      rain: 0.4,
    },
  )
}
