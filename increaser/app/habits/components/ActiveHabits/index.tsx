import { useBoolean } from '@lib/ui/hooks/useBoolean'
import styled from 'styled-components'
import { Panel } from '@lib/ui/panel/Panel'
import { Spacer } from '@lib/ui/layout/Spacer'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'

import { CreateHabitPrompt } from '../CreateHabit/CreateHabitPrompt'
import { ActiveHabitsContext } from './ActiveHabitsContext'
import { ActiveHabitsList } from './ActiveHabitsList'
import { CreateHabitCard } from './CreateHabitCard'
import { HabitsProgress } from './HabitsProgress'
import { HabitsStreak } from './HabitsStreak'
import { HabitsSuccess } from './HabitsSuccess'
import { ResetAllHabits } from './ResetAllHabits'
import { useHabits } from '@increaser/ui/habits/HabitsContext'

const Container = styled(Panel)`
  padding: 16px;
  padding-top: 20px;
  background: ${({ theme }) => theme.colors.mist.toCssValue()};
`

export const ActiveHabits = () => {
  const [
    isCreatingHabit,
    { set: startCreatingHabit, unset: stopCreatingHabit },
  ] = useBoolean(false)

  const { habits } = useHabits()

  return (
    <Container>
      <VStack>
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
        {(habits.length > 0 || isCreatingHabit) && <Spacer height={20} />}
        <ActiveHabitsContext.Provider value={{ isReadonly: false }}>
          <ActiveHabitsList />
        </ActiveHabitsContext.Provider>
        <Spacer height={20} />
        {isCreatingHabit ? (
          <CreateHabitCard onFinish={stopCreatingHabit} />
        ) : (
          <CreateHabitPrompt onClick={startCreatingHabit} />
        )}
      </VStack>
    </Container>
  )
}
