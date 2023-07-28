import { useAuthFlow } from 'auth/components/AuthFlow/AuthFlowContext'
import { useAuth } from 'auth/hooks/useAuth'
import { createContext, useCallback } from 'react'
import { ComponentWithChildrenProps } from 'shared/props'
import { createContextHook } from 'shared/utils/createContextHook'

export interface PresentationState {
  onInteraction: (func: () => void) => void
}

export const PresentationContext = createContext<PresentationState | undefined>(
  undefined,
)

interface Props extends ComponentWithChildrenProps {}

export const PresentationProvider = ({ children }: Props) => {
  const { isUserLoggedIn } = useAuth()
  const { setAuthFlowPurpose } = useAuthFlow()

  const onInteraction = useCallback(
    (func: () => void) => {
      if (isUserLoggedIn) {
        func()
      } else {
        setAuthFlowPurpose('signUp')
      }
    },
    [isUserLoggedIn, setAuthFlowPurpose],
  )

  return (
    <PresentationContext.Provider value={{ onInteraction }}>
      {children}
    </PresentationContext.Provider>
  )
}

export const usePresentation = createContextHook(
  PresentationContext,
  'PresentationContext',
)
