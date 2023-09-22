import { AuthSession } from '@increaser/api-interface/client/graphql'
import { useEffect } from 'react'
import {
  PersistentStateKey,
  managePersistentState,
} from 'state/persistentState'

type Command = 'DEBUG_ACCOUNT'

export const useDev = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return

    const { set } = managePersistentState<AuthSession>(
      PersistentStateKey.AuthSession,
    )
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.runCommand = (
      command: Command,
      token: string,
      tokenExpirationTime: number,
    ) => {
      if (command === 'DEBUG_ACCOUNT') {
        set({
          token,
          expiresAt: tokenExpirationTime,
        })
      }
    }
  }, [])
}
