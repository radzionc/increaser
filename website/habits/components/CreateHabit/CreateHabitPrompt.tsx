import { ClickableComponentProps } from '@increaser/ui/props'
import styled from 'styled-components'
import { defaultTransitionCSS } from '@increaser/ui/ui/animations/transitions'
import { defaultBorderRadiusCSS } from '@increaser/ui/ui/borderRadius'
import { UnstyledButton } from '@increaser/ui/ui/buttons/UnstyledButton'
import { PlusIcon } from '@increaser/ui/ui/icons/PlusIcon'
import { HStack } from '@increaser/ui/ui/Stack'

const Container = styled(UnstyledButton)`
  padding: 16px 20px;
  ${defaultBorderRadiusCSS};

  ${defaultTransitionCSS};

  border: 1px dashed ${({ theme }) => theme.colors.textShy.toCssValue()};

  font-weight: 500;

  :hover {
    background: ${({ theme }) => theme.colors.background.toCssValue()};
  }
`

export const CreateHabitPrompt = ({ onClick }: ClickableComponentProps) => (
  <Container onClick={onClick}>
    <HStack fullWidth alignItems="center" gap={8}>
      <PlusIcon /> Habit
    </HStack>
  </Container>
)
