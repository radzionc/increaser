import styled from 'styled-components'
import { Panel } from '@lib/ui/panel/Panel'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'

import { HabitsProgress } from './HabitsProgress'
import { HabitsStreak } from './HabitsStreak'
import { HabitsSuccess } from './HabitsSuccess'
import { ResetAllHabits } from './ResetAllHabits'

const Container = styled(Panel)`
  padding: 16px;
  padding-top: 20px;
  background: ${({ theme }) => theme.colors.mist.toCssValue()};
`

export const ActiveHabits = () => {
  return (
    <Container>
      <VStack gap={16}>
        <HStack alignItems="start" justifyContent="space-between">
          <VStack gap={4}>
            <Text size={18} weight="bold" color="regular">
              Active habits
            </Text>
            <HStack wrap="wrap" gap={12} alignItems="center">
              <HabitsStreak />
              <HabitsSuccess />
            </HStack>
          </VStack>
        </HStack>
        <HabitsProgress />
        <ResetAllHabits />
      </VStack>
    </Container>
  )
}
