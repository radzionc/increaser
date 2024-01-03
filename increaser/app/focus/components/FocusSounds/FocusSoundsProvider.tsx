import { useCallback, useEffect } from 'react'
import { ReactNode } from 'react'
import { useUpdateUserMutation } from '@increaser/app/user/mutations/useUpdateUserMutation'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'

import { FocusSoundsContext } from './FocusSoundsContext'
import { useFocusSoundsState } from './useFocusSoundsState'
import { FocusSound } from '@increaser/entities/FocusSound'

interface Props {
  children: ReactNode
}

export const FocusSoundsProvider = ({ children }: Props) => {
  const [state, setState] = useFocusSoundsState()

  const { focusSounds } = useAssertUserState()

  const { mutate: updateUser } = useUpdateUserMutation()

  const { isEnabled, activeSoundUrl, isPlaying } = state

  const updateSounds = useCallback(
    (sounds: FocusSound[]) => updateUser({ focusSounds: sounds }),
    [updateUser],
  )

  const updateIsEnabled = useCallback(
    (isEnabled: boolean) =>
      setState({
        ...state,
        isEnabled,
      }),
    [setState, state],
  )

  const updateIsPlaying = useCallback(
    (isPlaying: boolean) =>
      setState({
        ...state,
        isPlaying,
      }),
    [setState, state],
  )

  const updateActiveSoundUrl = useCallback(
    (activeSoundUrl: string | null) =>
      setState({
        ...state,
        activeSoundUrl,
      }),
    [setState, state],
  )

  const isActiveSoundMissing =
    activeSoundUrl !== null &&
    !focusSounds.find((sound) => sound.url === activeSoundUrl)

  useEffect(() => {
    if (isActiveSoundMissing) {
      updateActiveSoundUrl(null)
    }
  }, [isActiveSoundMissing, updateActiveSoundUrl])

  if (isActiveSoundMissing) {
    return null
  }

  return (
    <FocusSoundsContext.Provider
      value={{
        isEnabled,
        updateIsEnabled,

        isPlaying,
        updateIsPlaying,

        sounds: focusSounds,
        updateSounds,

        activeSoundUrl,
        updateActiveSoundUrl,
      }}
    >
      {children}
    </FocusSoundsContext.Provider>
  )
}
