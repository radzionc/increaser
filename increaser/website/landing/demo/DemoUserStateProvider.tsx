import { useCallback, useState } from 'react'
import { UserStateContext } from '@increaser/ui/user/UserStateContext'

import { User } from '@increaser/entities/User'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { getDemoUser } from '@increaser/demo/getDemoUser'

export const DemoUserStateProvider = ({
  children,
}: ComponentWithChildrenProps) => {
  const [state, setState] = useState<User>(getDemoUser)

  const updateState = useCallback(
    (pieceOfState: Partial<User>) => {
      setState((state) => ({
        ...(state || {}),
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
