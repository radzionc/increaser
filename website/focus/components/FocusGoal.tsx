import { useFocus } from 'focus/hooks/useFocus'
import styled from 'styled-components'
import { transition } from '@increaser/ui/css/transition'
import { UnstyledButton } from '@increaser/ui/buttons/UnstyledButton'
import { TargetIcon } from '@increaser/ui/icons/TargetIcon'
import { Opener } from '@increaser/ui/base/Opener'
import { HStack } from '@increaser/ui/layout/Stack'
import { Text } from '@increaser/ui/text'
import { centerContent } from '@increaser/ui/css/centerContent'
import { sameDimensions } from '@increaser/ui/css/sameDimensions'

import { UpdateFocusDurationOverlay } from './CurrentSetDuration'

const Wrapper = styled.div`
  position: absolute;
  left: -20px;
  bottom: -20px;
`

const Container = styled(UnstyledButton)`
  border-radius: 20px;
  ${sameDimensions(40)};
  background: ${({ theme }) => theme.colors.background.toCssValue()};
  border: 2px solid ${({ theme }) => theme.colors.mist.toCssValue()};
  ${centerContent};
  position: relative;

  color: ${({ theme }) => theme.colors.textSupporting.toCssValue()};

  ${transition};

  &:hover {
    color: ${({ theme }) => theme.colors.text.toCssValue()};
    border-color: ${({ theme }) => theme.colors.mistExtra.toCssValue()};
  }
`

const Value = styled(Text)`
  position: absolute;
  right: -50px;
  top: -8px;
  font-size: 14px;
  font-weight: 500;
  transition: none;
`

export const FocusGoal = () => {
  const { focusDuration } = useFocus()

  return (
    <Wrapper>
      <HStack alignItems="center" gap={16}>
        <Opener
          renderOpener={({ onOpen }) => (
            <Container title="Change focus duration" onClick={onOpen}>
              <TargetIcon />
              <Value nowrap>{focusDuration} min</Value>
            </Container>
          )}
          renderContent={({ onClose }) => (
            <UpdateFocusDurationOverlay onClose={onClose} />
          )}
        />
      </HStack>
    </Wrapper>
  )
}
