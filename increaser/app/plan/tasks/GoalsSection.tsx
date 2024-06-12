import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { useActiveGoals } from '@increaser/ui/goals/hooks/useActiveGoals'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { ActionPrompt } from '@lib/ui/info/ActionPrompt'
import Link from 'next/link'
import { getAppPath } from '@increaser/ui/navigation/app'
import { Button } from '@lib/ui/buttons/Button'
import { GoalItem } from '@increaser/ui/goals/GoalItem'
import { CurrentGoalProvider } from '@increaser/ui/goals/CurrentGoalProvider'
import { GoalsSectionContainer } from './GoalsSectionContainer'
import { VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'

export const GoalsSection = () => {
  const items = useActiveGoals()

  if (isEmpty(items)) {
    return (
      <ActionPrompt
        action={
          <Link href={getAppPath('goals', 'active')}>
            <Button as="div">Set goals</Button>
          </Link>
        }
      >
        Set your goals now to help guide your daily tasks and keep you on track
        for success.
      </ActionPrompt>
    )
  }

  return (
    <VStack gap={16}>
      <Text size={14} weight="semibold" color="supporting">
        Align today's tasks with your goals
      </Text>
      <ActiveItemIdProvider initialValue={null}>
        <GoalsSectionContainer>
          {items.map((goal) => (
            <CurrentGoalProvider key={goal.id} value={goal}>
              <GoalItem />
            </CurrentGoalProvider>
          ))}
        </GoalsSectionContainer>
      </ActiveItemIdProvider>
    </VStack>
  )
}
