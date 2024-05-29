import { ClickableComponentProps } from '@lib/ui/props'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { Text } from '@lib/ui/text'
import { Hoverable } from '@lib/ui/base/Hoverable'
import styled from 'styled-components'
import { centerContent } from '@lib/ui/css/centerContent'
import { getColor } from '@lib/ui/theme/getters'
import { transition } from '@lib/ui/css/transition'
import { HStack } from '@lib/ui/layout/Stack'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { Opener } from '@lib/ui/base/Opener'

const IconContainer = styled.div`
  ${sameDimensions(24)};
  ${centerContent};
  color: ${getColor('primary')};
`

const Container = styled(Hoverable)`
  color: ${getColor('textShy')};
  ${transition};
  &:hover {
    color: ${getColor('primary')};
  }
`

export const AddVisionAttributePrompt = ({
  onClick,
}: ClickableComponentProps) => {
  return (
    <Opener
      renderOpener={({ onOpen, isOpen }) =>
        isOpen ? null : (
          <Container verticalOffset={0} onClick={onOpen}>
            <HStack alignItems="center" gap={12}>
              <IconContainer>
                <PlusIcon />
              </IconContainer>
              <Text size={14}>Add life aspiration</Text>
            </HStack>
          </Container>
        )
      }
      renderContent={({ onClose }) => <div />}
    />
  )
}
