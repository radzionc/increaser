import { useBoolean } from 'shared/hooks/useBoolean'
import styled from 'styled-components'
import { Panel } from '@increaser/ui/ui/Panel/Panel'
import { Spacer } from '@increaser/ui/ui/Spacer'
import { HStack, VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'

import { CreateHabitPrompt } from '../CreateHabit/CreateHabitPrompt'
import { useHabits } from '../HabitsProvider'
import { ActiveHabitsContext } from './ActiveHabitsContext'
import { ActiveHabitsList } from './ActiveHabitsList'
import { CreateHabitCard } from './CreateHabitCard'
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
