import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { Text } from '@lib/ui/text'
import { Hoverable } from '@lib/ui/base/Hoverable'
import styled from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'
import { transition } from '@lib/ui/css/transition'
import { HStack } from '@lib/ui/layout/Stack'
import { Opener } from '@lib/ui/base/Opener'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { CreateGoalForm } from './form/CreateGoalForm'
import { goalVerticalPadding } from './config'

const IconContainer = styled(IconWrapper)`
  color: ${getColor('primary')};
`

const Container = styled(Hoverable)`
  color: ${getColor('textSupporting')};
  ${verticalPadding(goalVerticalPadding)};
  ${transition};
  &:hover {
    color: ${getColor('primary')};
  }
`

export const AddGoal = () => {
  return (
    <Opener
      renderOpener={({ onOpen, isOpen }) =>
        isOpen ? null : (
          <Container verticalOffset={0} onClick={onOpen}>
            <HStack alignItems="center" gap={8}>
              <IconContainer>
                <PlusIcon />
              </IconContainer>
              <Text weight="semibold" size={14}>
                Add goal
              </Text>
            </HStack>
          </Container>
        )
      }
      renderContent={({ onClose }) => <CreateGoalForm onFinish={onClose} />}
    />
  )
}
