import { createContext } from 'react'
import { ComponentWithChildrenProps } from 'shared/props'

import { capitalizeFirstLetter } from './capitalizeFirstLetter'
import { createContextHook } from './createContextHook'

export function getValueProviderSetup<T>(name: string) {
  const ValueContext = createContext<T | undefined>(undefined)

  type Props = ComponentWithChildrenProps & { value: T }

  const ValueProvider = ({ children, value }: Props) => {
    return (
      <ValueContext.Provider value={value}>{children}</ValueContext.Provider>
    )
  }

  return {
    provider: ValueProvider,
    useValue: createContextHook(
      ValueContext,
      `${capitalizeFirstLetter(name)}Context`,
    ),
  }
}
