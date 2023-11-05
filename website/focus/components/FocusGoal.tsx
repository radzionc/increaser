import { useFocus } from 'focus/hooks/useFocus'
import styled from 'styled-components'
import { defaultTransitionCSS } from '@increaser/ui/ui/animations/transitions'
import { UnstyledButton } from '@increaser/ui/ui/buttons/UnstyledButton'
import { TargetIcon } from '@increaser/ui/icons/TargetIcon'
import { Opener } from '@increaser/ui/ui/Opener'
import { HStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { centerContentCSS } from '@increaser/ui/ui/utils/centerContentCSS'
import { getSameDimensionsCSS } from '@increaser/ui/ui/utils/getSameDimensionsCSS'

import { UpdateFocusDurationOverlay } from './CurrentSetDuration'

const Wrapper = styled.div`
  position: absolute;
  left: -20px;
  bottom: -20px;
`

const Container = styled(UnstyledButton)`
  border-radius: 20px;
  ${getSameDimensionsCSS(40)};
  background: ${({ theme }) => theme.colors.background.toCssValue()};
  border: 2px solid ${({ theme }) => theme.colors.mist.toCssValue()};
  ${centerContentCSS};
  position: relative;

  color: ${({ theme }) => theme.colors.textSupporting.toCssValue()};

  ${defaultTransitionCSS};

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
