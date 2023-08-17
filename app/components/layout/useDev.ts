import { useEffect } from 'react'
import { PersistentStateKey, persistentStorage } from 'state/persistentStorage'

type Command = 'DEBUG_ACCOUNT'

export const useDev = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.runCommand = (
      command: Command,
      token: string,
      tokenExpirationTime: number,
      // id: string
    ) => {
      if (command === 'DEBUG_ACCOUNT') {
        // TO-DO: remove current user
        persistentStorage.setItem(PersistentStateKey.AuthToken, token)
        persistentStorage.setItem(
          PersistentStateKey.AuthTokenExpirationTime,
          tokenExpirationTime,
        )
      }
    }
  }, [])
}
