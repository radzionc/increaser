import { Hoverable } from '@lib/ui/base/Hoverable'
import { Opener } from '@lib/ui/base/Opener'
import { Text } from '@lib/ui/text'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { fromDay, stringToDay } from '@lib/utils/time/Day'
import { formatDuration, intervalToDuration } from 'date-fns'

import { useUser } from '../../user/state/user'
import { SetDobOverlay } from '../dob/SetDobOverlay'

export const CurrentAge = () => {
  const { dob } = useUser()

  const dobTimestamp = fromDay(stringToDay(shouldBePresent(dob)))
  const duration = intervalToDuration({
    start: dobTimestamp,
    end: Date.now(),
  })

  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <Hoverable onClick={onOpen}>
          <Text color="primary">
            {formatDuration(duration, {
              format: ['years', 'months', 'days'],
            })}{' '}
            old
          </Text>
        </Hoverable>
      )}
      renderContent={({ onClose }) => <SetDobOverlay onFinish={onClose} />}
    />
  )
}
