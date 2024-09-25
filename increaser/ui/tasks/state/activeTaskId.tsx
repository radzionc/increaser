import { ContextState } from '@lib/ui/state/ContextState'
import { createContext, useState } from 'react'
import { useAssertUserState } from '../../user/UserStateContext'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { useStateCorrector } from '@lib/ui/state/useStateCorrector'
import { createContextHook } from '@lib/ui/state/createContextHook'

const Context = createContext<ContextState<string | null> | undefined>(
  undefined,
)

export const ActiveTaskIdProvider = ({
  children,
}: ComponentWithChildrenProps) => {
  const { tasks } = useAssertUserState()

  const [value, setValue] = useStateCorrector(
    useState<string | null>(null),
    (id) => {
      if (id === null) {
        return id
      }

      if (id in tasks) {
        return id
      }

      return null
    },
  )

  return (
    <Context.Provider value={{ value, setValue }}>{children}</Context.Provider>
  )
}

export const useActiveTaskId = createContextHook(
  Context,
  'ActiveTaskId',
  (result) => [result.value, result.setValue] as const,
)
