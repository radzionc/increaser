import { ComponentWithChildrenProps } from '@increaser/ui/shared/props'
import { useEffect } from 'react'
import {
  PersistentStorageKey,
  usePersistentState,
} from 'state/persistentStorage'

interface ShowOnceProps extends ComponentWithChildrenProps {
  storageKey: PersistentStorageKey
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
