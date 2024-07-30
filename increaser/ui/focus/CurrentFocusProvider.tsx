import { createContext } from 'react'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { createContextHook } from '@lib/ui/state/createContextHook'
import { FocusSession, useFocus } from './FocusContext'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'

export const CurrentFocusContext = createContext<FocusSession | undefined>(
  undefined,
)

export const CurrentFocusGuard = ({ children }: ComponentWithChildrenProps) => {
  const { session: potentialCurrentSet } = useFocus()
  const currentSet = shouldBePresent(potentialCurrentSet)

  if (!currentSet) {
    return null
  }

  return (
    <CurrentFocusContext.Provider value={currentSet}>
      {children}
    </CurrentFocusContext.Provider>
  )
}

export const useCurrentFocus = createContextHook(
  CurrentFocusContext,
  'CurrentFocusContext',
)
