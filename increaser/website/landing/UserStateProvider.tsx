import { useCallback, useState } from 'react'
import { UserStateContext } from '@increaser/ui/state/UserStateContext'

import { User } from '@increaser/entities/User'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { getDemoUser } from '@increaser/demo/getDemoUser'

export const UserStateProvider = ({ children }: ComponentWithChildrenProps) => {
  const [state, setState] = useState<User>(getDemoUser)

  const updateState = useCallback(
    (pieceOfState: Partial<User>) => {
      setState((state) => ({
        ...(state || ({} as User)),
        ...pieceOfState,
      }))
    },
    [setState],
  )

  return (
    <UserStateContext.Provider
      value={{
        state: state,
        updateState,
        pullRemoteState: () => {},
        isLoading: false,
        lastUpdatedAt: Date.now(),
      }}
    >
      {children}
    </UserStateContext.Provider>
  )
}
