import { useRouter } from 'next/router'
import { createContext, useCallback } from 'react'
import { Path } from '@increaser/app/router/Path'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { createContextHook } from '@lib/ui/state/createContextHook'
import { useAuthSession } from '@increaser/app/auth/hooks/useAuthSession'

export interface PresentationState {
  onInteraction: (func: () => void) => void
}

export const PresentationContext = createContext<PresentationState | undefined>(
  undefined,
)

interface Props extends ComponentWithChildrenProps {}

export const PresentationProvider = ({ children }: Props) => {
  const { push } = useRouter()
  const [authSession] = useAuthSession()

  const onInteraction = useCallback(
    (func: () => void) => {
      if (authSession) {
        func()
      } else {
        push(Path.SignUp)
      }
    },
    [authSession, push],
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
