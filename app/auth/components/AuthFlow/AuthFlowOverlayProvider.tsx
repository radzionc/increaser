import { trackEvent } from 'analytics'
import { AuthFlowPurpose } from 'auth/AuthFlowPurpose'
import { useEffect, useState } from 'react'
import { usePrevious } from 'react-use'

import { AuthDestination, AuthFlowContext } from './AuthFlowContext'
import { CheckYourEmailOverlay } from './CheckYourEmailOverlay'
import { EmailAuthFlowContext } from './EmailAuthFlowContext'
import { SignInOverlay } from './SignInOverlay'
import { SignUpOverlay } from './SignUpOverlay'

interface Props {
  children: React.ReactNode
}

export const AuthFlowOverlayProvider = ({ children }: Props) => {
  const [authFlowPurpose, setAuthFlowPurpose] =
    useState<AuthFlowPurpose | null>(null)

  const [email, setEmail] = useState<string | null>(null)

  const previousAuthFlowPurpose = usePrevious(authFlowPurpose)
  useEffect(() => {
    if (previousAuthFlowPurpose === null && authFlowPurpose === 'signUp') {
      trackEvent('Open sign up overlay')
    }
  }, [authFlowPurpose, previousAuthFlowPurpose])

  return (
    <AuthFlowContext.Provider
      value={{
        authFlowPurpose,
        setAuthFlowPurpose,
        destination: AuthDestination.App,
      }}
    >
      <EmailAuthFlowContext.Provider
        value={{
          email,
          setEmail,
        }}
      >
        {children}
        {email && (
          <CheckYourEmailOverlay
            email={email}
            onEditEmail={() => setEmail(null)}
          />
        )}
        {!email && authFlowPurpose === 'signUp' && <SignUpOverlay />}
        {!email && authFlowPurpose === 'signIn' && <SignInOverlay />}
      </EmailAuthFlowContext.Provider>
    </AuthFlowContext.Provider>
  )
}
