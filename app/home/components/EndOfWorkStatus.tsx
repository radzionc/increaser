import { Path } from 'router/Path'
import { useRhythmicRerender } from 'shared/hooks/useRhythmicRerender'
import { useStartOfDay } from 'shared/hooks/useStartOfDay'
import { formatDuration } from '@increaser/utils/formatDuration'
import { Text } from '@increaser/ui/ui/Text'
import { useAssertUserState } from 'user/state/UserStateContext'
import { MS_IN_MIN } from '@increaser/utils/time'
import Link from 'next/link'

export const EndOfWorkStatus = () => {
  const startOfDay = useStartOfDay()
  useRhythmicRerender(2000)

  const { goalToFinishWorkBy } = useAssertUserState()

  const workEndsAt = startOfDay + goalToFinishWorkBy * MS_IN_MIN

  const now = Date.now()
  const workEndsIn = workEndsAt - now

  if (workEndsIn < 0) {
    return null
  }

  return (
    <Link href={Path.Sessions}>
      <Text style={{ marginLeft: 48 }} size={14} color="supporting">
        <Text as="span" weight="bold" color="regular">
          {formatDuration(workEndsIn, 'ms')}
        </Text>{' '}
        left to finish work
      </Text>
    </Link>
  )
}
