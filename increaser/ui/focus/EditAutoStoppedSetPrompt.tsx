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
import { Text } from '@lib/ui/text'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { getSetDuration } from '@increaser/entities-utils/set/getSetDuration'
import { HStack } from '@lib/ui/layout/Stack'
import { useUpdateSetMutation } from '@increaser/app/sets/hooks/useUpdateSetMutation'

export const EditAutoStoppedSetPrompt = () => {
  const sets = useCurrentWeekSets()
  const { lastSyncedMonthEndedAt, lastSyncedWeekEndedAt } = useAssertUserState()
  const { projects } = useAssertUserState()

  const { mutate: updateSet } = useUpdateSetMutation()

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
    const project = projects[setToEdit.projectId]
    return (
      <ActionPrompt
        action={
          <HStack alignItems="center" gap={8}>
            <Button
              onClick={() => {
                updateSet({
                  old: setToEdit,
                  new: { ...setToEdit, isEndEstimated: false },
                })
              }}
              kind="outlined"
            >
              Cancel
            </Button>

            <Link
              href={addQueryParams(getAppPath('timeTracking', 'track'), {
                edit: getSetHash(setToEdit),
              })}
            >
              <Button as="div">Edit</Button>
            </Link>
          </HStack>
        }
      >
        <Text>
          It seems like you forgot to stop your last session{' '}
          <Text as="span" weight="bold" color="contrast">
            (
            {formatDuration(getSetDuration(setToEdit), 'ms', {
              minUnit: 'min',
            })}{' '}
            of {project.name})
          </Text>
          . It was automatically stopped for you. Would you like to edit the end
          time to ensure the correct time is tracked?
        </Text>
      </ActionPrompt>
    )
  }

  return null
}
