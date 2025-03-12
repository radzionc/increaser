import { useLastSetEnd } from '@product/app/sets/hooks/useLastSetEnd'
import { useUserChangedFocusDurationAt } from '@product/ui/focus/state/useUserChangedFocusDurationAt'
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
