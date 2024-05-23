import {
  PersistentStateKey,
  usePersistentState,
} from '@increaser/ui/state/persistentState'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useEffect, useMemo } from 'react'

type YouTubeFocusPreference = {
  url: string | null
}

export const useYouTubeFocusPreference = () => {
  const [state, setState] = usePersistentState<YouTubeFocusPreference>(
    PersistentStateKey.YouTubeFocusPreference,
    {
      url: null,
    },
  )

  const { focusSounds } = useAssertUserState()
  const guardedState = useMemo(() => {
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
  }, [focusSounds, state])

  useEffect(() => {
    if (guardedState !== state) {
      setState(guardedState)
    }
  }, [guardedState, setState, state])

  return [guardedState, setState] as const
}
