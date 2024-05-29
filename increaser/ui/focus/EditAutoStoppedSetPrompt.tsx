import { getLastItem } from '@lib/utils/array/getLastItem'
import { useAssertUserState } from '../user/UserStateContext'
import { useMemo } from 'react'
import { useCurrentWeekSets } from '../sets/hooks/useCurrentWeekSets'
import { ActionPrompt } from '@lib/ui/info/ActionPrompt'
import { Button } from '@lib/ui/buttons/Button'
import Link from 'next/link'
import { AppPath } from '../navigation/AppPath'

export const EditAutoStoppedSetPrompt = () => {
  const sets = useCurrentWeekSets()
  const { lastSyncedMonthEndedAt, lastSyncedWeekEndedAt } = useAssertUserState()

  const shouldShowPrompt = useMemo(() => {
    const lastSet = getLastItem(sets)
    if (!lastSet || !lastSet.isEndEstimated) return false

    const minStartedAt = Math.max(
      lastSyncedMonthEndedAt ?? 0,
      lastSyncedWeekEndedAt ?? 0,
    )

    return lastSet.start >= minStartedAt
  }, [lastSyncedMonthEndedAt, lastSyncedWeekEndedAt, sets])

  if (shouldShowPrompt) {
    return (
      <ActionPrompt
        action={
          <Link href={AppPath.TrackTime}>
            <Button as="div">Edit</Button>
          </Link>
        }
      >
        Your last session was automatically stopped. Would you like to edit the
        end time?
      </ActionPrompt>
    )
  }

  return null
}
