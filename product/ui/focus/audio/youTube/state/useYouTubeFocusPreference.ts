import { useStateCorrector } from '@lib/ui/state/useStateCorrector'
import {
  PersistentStateKey,
  usePersistentState,
} from '@product/ui/state/persistentState'
import { useUser } from '@product/ui/user/state/user'
import { useCallback } from 'react'

type YouTubeFocusPreference = {
  url: string | null
}

export const useYouTubeFocusPreference = () => {
  const { focusSounds } = useUser()

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
