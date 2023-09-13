import { ComponentWithChildrenProps } from '@increaser/ui/props'
import { useEffect } from 'react'
import { PersistentStateKey, usePersistentState } from 'state/persistentState'

interface ShowOnceProps extends ComponentWithChildrenProps {
  storageKey: PersistentStateKey
}

export const ShowOnce = ({ children, storageKey }: ShowOnceProps) => {
  const [wasShownAt, setShowTime] = usePersistentState<number | undefined>(
    storageKey,
    undefined,
  )

  useEffect(() => {
    return () => {
      setShowTime(Date.now())
    }
  }, [setShowTime])

  return wasShownAt ? null : <>{children}</>
}
