import { useAuth } from 'auth/hooks/useAuth'
import { useRouter } from 'next/router'
import { createContext, useCallback } from 'react'
import { Path } from 'router/Path'
import { ComponentWithChildrenProps } from '@increaser/ui/props'
import { createContextHook } from '@increaser/ui/state/createContextHook'

export interface PresentationState {
  onInteraction: (func: () => void) => void
}

export const PresentationContext = createContext<PresentationState | undefined>(
  undefined,
)

interface Props extends ComponentWithChildrenProps {}

export const PresentationProvider = ({ children }: Props) => {
  const { isUserLoggedIn } = useAuth()
  const { push } = useRouter()

  const onInteraction = useCallback(
    (func: () => void) => {
      if (isUserLoggedIn) {
        func()
      } else {
        push(Path.SignUp)
      }
    },
    [isUserLoggedIn, push],
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
