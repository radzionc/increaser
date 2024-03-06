import { isEmpty } from '@lib/utils/array/isEmpty'
import { CreateHabitForm } from './CreateHabitForm'
import { VStack } from '@lib/ui/layout/Stack'
import { HabitItem } from './HabitItem'
import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'
import { InputContainer } from '@lib/ui/inputs/InputContainer'
import { LabelText } from '@lib/ui/inputs/LabelText'
import { ShyInfoBlock } from '@lib/ui/info/ShyInfoBlock'
import { useHabits } from '@increaser/ui/habits/HabitsContext'

export const HabitsOnboardingStep = () => {
  const { habits } = useHabits()

  return (
    <VStack style={{ maxWidth: 440 }} gap={40}>
      <CreateHabitForm />
      <InputContainer as="div" style={{ gap: 8 }}>
        <LabelText size={16}>Your habits</LabelText>
        {isEmpty(habits) ? (
          <ShyInfoBlock>
            Which daily habits are you aiming to develop?
          </ShyInfoBlock>
        ) : (
          <UniformColumnGrid gap={16} minChildrenWidth={160}>
            {habits.map((value) => (
              <HabitItem value={value} key={value.id} />
            ))}
          </UniformColumnGrid>
        )}
      </InputContainer>
    </VStack>
  )
}
