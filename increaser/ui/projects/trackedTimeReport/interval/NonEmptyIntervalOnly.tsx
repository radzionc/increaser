import { ComponentWithChildrenProps } from '@lib/ui/props'
import { useSelectedIntervalLength } from './useSelectedIntervalLength'

export const NonEmptyIntervalOnly = ({
  children,
}: ComponentWithChildrenProps) => {
  const dataSize = useSelectedIntervalLength()

  if (dataSize < 1) return null

  return <>{children}</>
}
