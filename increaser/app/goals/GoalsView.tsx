import { CheckSquareIcon } from '@lib/ui/icons/CheckSquareIcon'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { LightBulbIcon } from '@lib/ui/icons/LightBulbIcon'
import { HStack } from '@lib/ui/layout/Stack'
import { TabNavigationItem } from '@lib/ui/navigation/TabNavigation/TabNavigationItem'
import { Text } from '@lib/ui/text'
import { ReactNode, useId } from 'react'
import {
  PersistentStateKey,
  usePersistentState,
} from '@increaser/ui/state/persistentState'
import { SquareIcon } from '@lib/ui/icons/SquareIcon'
import { GoalStatus } from '@increaser/entities/Goal'

export const goalsView = ['idea', 'active', 'done'] as const
export type GoalView = (typeof goalsView)[number]

export const goalViewStatus: Record<GoalView, GoalStatus> = {
  idea: 'toDo',
  active: 'inProgress',
  done: 'done',
}

export const goalsViewName: Record<GoalView, string> = {
  idea: 'Ideas',
  active: 'Active',
  done: 'Done',
}

export const goalsViewIcon: Record<GoalView, ReactNode> = {
  idea: <LightBulbIcon />,
  active: <SquareIcon />,
  done: <CheckSquareIcon />,
}

export const useGoalsView = () => {
  return usePersistentState<GoalView>(PersistentStateKey.GoalsView, 'active')
}

export const GoalsViewSelector = () => {
  const [view, setView] = useGoalsView()
  const id = useId()

  return (
    <HStack gap={4}>
      {goalsView.map((value) => (
        <TabNavigationItem
          isSelected={value === view}
          onSelect={() => setView(value)}
          value={value}
          key={value}
          groupName={id}
        >
          <HStack alignItems="center" gap={8}>
            <IconWrapper>{goalsViewIcon[value]}</IconWrapper>
            <Text>{goalsViewName[value]}</Text>
          </HStack>
        </TabNavigationItem>
      ))}
    </HStack>
  )
}
