import {
  PersistentStateKey,
  usePersistentState,
} from '@increaser/ui/state/persistentState'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useCallback } from 'react'
import { useStateCorrector } from '@lib/ui/state/useStateCorrector'

type YouTubeFocusPreference = {
  url: string | null
}

export const useYouTubeFocusPreference = () => {
  const { focusSounds } = useAssertUserState()

  return useStateCorrector(
    usePersistentState<YouTubeFocusPreference>(
      PersistentStateKey.YouTubeFocusPreference,
      {
        url: null,
      },
    ),
    useCallback(
      (state) => {
        if (focusSounds.some((sound) => sound.url === state.url)) {
          return state
        }

        const favouriteSounds = focusSounds.filter((sound) => sound.favourite)
        if (favouriteSounds.length > 0) {
          return {
            ...state,
            url: favouriteSounds[0].url,
          }
        }

        if (focusSounds.length > 0) {
          return {
            ...state,
            url: focusSounds[0].url,
          }
        }

        return {
          ...state,
          url: null,
        }
      },
      [focusSounds],
    ),
  )
}
