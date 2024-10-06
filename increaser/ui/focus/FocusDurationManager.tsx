import { useUserChangedFocusDurationAt } from '@increaser/app/focus/state/useUserChangedFocusDurationAt'
import { useLastSetEnd } from '@increaser/app/sets/hooks/useLastSetEnd'
import { useMemo } from 'react'
import { FocusDurationCustomizer } from './FocusDurationCustomizer'

export const FocusDurationManager = () => {
  const [changedByUserAt] = useUserChangedFocusDurationAt()
  const lastSetEndAt = useLastSetEnd()

  const canBeAdjusted = useMemo(() => {
    if (!changedByUserAt) return true

    if (!lastSetEndAt) return false

    return lastSetEndAt > changedByUserAt
  }, [changedByUserAt, lastSetEndAt])

  if (canBeAdjusted) {
    return <FocusDurationCustomizer />
  }

  return null
}
