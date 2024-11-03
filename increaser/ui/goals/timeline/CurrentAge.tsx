import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { fromDay, stringToDay } from '@lib/utils/time/Day'
import { formatDuration, intervalToDuration } from 'date-fns'
import { Opener } from '@lib/ui/base/Opener'
import { SetDobOverlay } from '../dob/SetDobOverlay'
import { useUser } from '../../user/state/user'
import { Hoverable } from '@lib/ui/base/Hoverable'
import { Text } from '@lib/ui/text'

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
