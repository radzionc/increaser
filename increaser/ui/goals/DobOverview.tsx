import { useAssertUserState } from '../user/UserStateContext'
import { Opener } from '@lib/ui/base/Opener'
import { SetDobForm } from './SetDobForm'
import { Text } from '@lib/ui/text'
import { HStack } from '@lib/ui/layout/Stack'
import { IconButton } from '@lib/ui/buttons/IconButton'
import { EditIcon } from '@lib/ui/icons/EditIcon'
import { Panel } from '@lib/ui/panel/Panel'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { fromDay, stringToDay } from '@lib/utils/time/Day'
import { intervalToDuration, formatDuration } from 'date-fns'
import { LabeledValue } from '@lib/ui/text/LabeledValue'

export const DobOverview = () => {
  const { dob } = useAssertUserState()

  return (
    <Opener
      renderOpener={({ onOpen, isOpen }) => {
        const dobTimestamp = fromDay(stringToDay(shouldBePresent(dob)))
        const duration = intervalToDuration({
          start: dobTimestamp,
          end: Date.now(),
        })
        return isOpen ? null : (
          <Panel>
            <HStack
              alignItems="center"
              fullWidth
              justifyContent="space-between"
              gap={20}
            >
              <LabeledValue labelColor="supporting" name="Your age">
                <Text as="span" weight="semibold" color="contrast">
                  {formatDuration(duration, {
                    format: ['years', 'months', 'days'],
                  })}{' '}
                </Text>
              </LabeledValue>
              <IconButton
                title="Edit day of birth"
                onClick={onOpen}
                icon={<EditIcon />}
              />
            </HStack>
          </Panel>
        )
      }}
      renderContent={({ onClose }) => <SetDobForm onFinish={onClose} />}
    />
  )
}
