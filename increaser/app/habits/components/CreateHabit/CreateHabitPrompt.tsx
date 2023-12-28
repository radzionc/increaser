import { ClickableComponentProps } from '@lib/ui/props'
import styled from 'styled-components'
import { transition } from '@lib/ui/css/transition'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { HStack } from '@lib/ui/layout/Stack'

const Container = styled(UnstyledButton)`
  padding: 16px 20px;
  ${borderRadius.m};

  ${transition};

  border: 1px dashed ${({ theme }) => theme.colors.textShy.toCssValue()};

  font-weight: 500;

  &:hover {
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
