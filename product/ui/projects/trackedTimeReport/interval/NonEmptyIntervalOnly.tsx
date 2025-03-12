import { ChildrenProp } from '@lib/ui/props'

import { useSelectedIntervalLength } from './useSelectedIntervalLength'

export const NonEmptyIntervalOnly = ({ children }: ChildrenProp) => {
  const dataSize = useSelectedIntervalLength()

  if (dataSize < 1) return null

  return <>{children}</>
}
