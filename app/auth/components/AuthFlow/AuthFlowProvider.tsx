import { AuthFlowPurpose } from 'auth/AuthFlowPurpose'
import { useState } from 'react'

import { AuthDestination, AuthFlowContext } from './AuthFlowContext'

interface Props {
  children: React.ReactNode
  authFlowPurpose: AuthFlowPurpose
  destination?: AuthDestination
}

export const AuthFlowProvider = ({
  children,
  authFlowPurpose: initialAuthFlowPurpose,
  destination = AuthDestination.App,
}: Props) => {
  const [authFlowPurpose, setAuthFlowPurpose] =
    useState<AuthFlowPurpose | null>(initialAuthFlowPurpose)

  return (
    <AuthFlowContext.Provider
      value={{ authFlowPurpose, setAuthFlowPurpose, destination }}
    >
      {children}
    </AuthFlowContext.Provider>
  )
}
