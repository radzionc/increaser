import { HStack } from '@lib/ui/layout/Stack'
import { useAssertUserState } from '../../user/UserStateContext'
import { format } from 'date-fns'
import { fromDay, stringToDay } from '@lib/utils/time/Day'
import { EditIcon } from '@lib/ui/icons/EditIcon'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import styled from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'
import { transition } from '@lib/ui/css/transition'
import { ClickableComponentProps } from '@lib/ui/props'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { Button } from '@lib/ui/buttons/Button'

const IconContainer = styled(IconWrapper)`
  color: ${getColor('textSupporting')};
  ${transition};
`

const Container = styled(Button)`
  height: 40px;
  font-size: 14px;
`

export const EditDobPrompt = ({ onClick }: ClickableComponentProps) => {
  const { dob } = useAssertUserState()

  return (
    <Container kind="outlined" type="button" onClick={onClick}>
      <HStack alignItems="center" gap={8}>
        <IconContainer>
          <EditIcon />
        </IconContainer>
        {format(fromDay(stringToDay(shouldBePresent(dob))), 'dd MMMM yyyy')}
      </HStack>
    </Container>
  )
}
