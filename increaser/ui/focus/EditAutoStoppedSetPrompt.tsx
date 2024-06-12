import { getLastItem } from '@lib/utils/array/getLastItem'
import { useAssertUserState } from '../user/UserStateContext'
import { useMemo } from 'react'
import { useCurrentWeekSets } from '../sets/hooks/useCurrentWeekSets'
import { ActionPrompt } from '@lib/ui/info/ActionPrompt'
import { Button } from '@lib/ui/buttons/Button'
import Link from 'next/link'
import { getAppPath } from '../navigation/app'
import { getSetHash } from '@increaser/app/sets/helpers/getSetHash'
import { addQueryParams } from '@lib/utils/query/addQueryParams'

export const EditAutoStoppedSetPrompt = () => {
  const sets = useCurrentWeekSets()
  const { lastSyncedMonthEndedAt, lastSyncedWeekEndedAt } = useAssertUserState()

  const setToEdit = useMemo(() => {
    const lastSet = getLastItem(sets)
    if (!lastSet || !lastSet.isEndEstimated) return null

    const minStartedAt = Math.max(
      lastSyncedMonthEndedAt ?? 0,
      lastSyncedWeekEndedAt ?? 0,
    )

    return lastSet.start >= minStartedAt ? lastSet : null
  }, [lastSyncedMonthEndedAt, lastSyncedWeekEndedAt, sets])

  if (setToEdit) {
    return (
      <ActionPrompt
        action={
          <Link
            href={addQueryParams(getAppPath('time-tracking', 'track'), {
              edit: getSetHash(setToEdit),
            })}
          >
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
