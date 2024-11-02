import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { fromDay, stringToDay } from '@lib/utils/time/Day'
import { formatDuration, intervalToDuration } from 'date-fns'
import { Opener } from '@lib/ui/base/Opener'
import { SetDobOverlay } from '../dob/SetDobOverlay'
import { useUser } from '../../user/state/user'
import { Hoverable } from '@lib/ui/base/Hoverable'
import { LabeledValue } from '@lib/ui/text/LabeledValue'

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
          <LabeledValue name="Your age">
            {formatDuration(duration, {
              format: ['years', 'months', 'days'],
            })}
          </LabeledValue>
        </Hoverable>
      )}
      renderContent={({ onClose }) => <SetDobOverlay onFinish={onClose} />}
    />
  )
}
