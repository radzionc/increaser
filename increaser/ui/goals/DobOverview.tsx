import { useAssertUserState } from '../user/UserStateContext'
import { Opener } from '@lib/ui/base/Opener'
import { SetDobForm } from './dob/SetDobForm'
import { Text } from '@lib/ui/text'
import { HStack } from '@lib/ui/layout/Stack'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { fromDay, stringToDay } from '@lib/utils/time/Day'
import { intervalToDuration, formatDuration } from 'date-fns'
import { LabeledValue } from '@lib/ui/text/LabeledValue'
import styled from 'styled-components'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { getColor } from '@lib/ui/theme/getters'
import { EditIcon } from '@lib/ui/icons/EditIcon'
import { transition } from '@lib/ui/css/transition'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { interactive } from '@lib/ui/css/interactive'

const IconContainer = styled(IconWrapper)`
  color: transparent;
  ${transition};
`

const Container = styled(HStack)`
  ${interactive};
  font-size: 14px;
  font-weight: 500;
  align-items: center;
  gap: 8px;
  ${verticalPadding(16)};

  &:hover ${IconContainer} {
    color: ${getColor('contrast')};
  }
`

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
          <Container onClick={onOpen} alignItems="center" gap={20}>
            <LabeledValue name="Your age">
              <Text as="span" weight="semibold" color="regular">
                {formatDuration(duration, {
                  format: ['years', 'months', 'days'],
                })}{' '}
              </Text>
            </LabeledValue>
            <IconContainer>
              <EditIcon />
            </IconContainer>
          </Container>
        )
      }}
      renderContent={({ onClose }) => <SetDobForm onFinish={onClose} />}
    />
  )
}
