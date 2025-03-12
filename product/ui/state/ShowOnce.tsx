import { ChildrenProp } from '@lib/ui/props'
import {
  PersistentStateKey,
  usePersistentState,
} from '@product/ui/state/persistentState'
import { useEffect } from 'react'

interface ShowOnceProps extends ChildrenProp {
  storageKey: PersistentStateKey
}

export const ShowOnce = ({ children, storageKey }: ShowOnceProps) => {
  const [wasShownAt, setShowTime] = usePersistentState<number | null>(
    storageKey,
    null,
  )

  useEffect(() => {
    return () => {
      setShowTime(Date.now())
    }
  }, [setShowTime])

  return wasShownAt ? null : <>{children}</>
}
