import { ClickableComponentProps } from '@increaser/ui/props'
import styled from 'styled-components'
import { transition } from '@increaser/ui/css/transition'
import { borderRadius } from '@increaser/ui/css/borderRadius'
import { UnstyledButton } from '@increaser/ui/buttons/UnstyledButton'
import { PlusIcon } from '@increaser/ui/icons/PlusIcon'
import { HStack } from '@increaser/ui/layout/Stack'

const Container = styled(UnstyledButton)`
  padding: 16px 20px;
  ${borderRadius.m};

  ${transition};

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
