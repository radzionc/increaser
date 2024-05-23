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
    if (!state.url || focusSounds.some((sound) => sound.url === state.url)) {
      return state
    }

    return {
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
