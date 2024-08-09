import {
  PersistentStateKey,
  usePersistentState,
} from '@increaser/ui/state/persistentState'
import { useStateCorrector } from '@lib/ui/state/useStateCorrector'
import { useCallback, useId } from 'react'
import { TabNavigationItem } from '@lib/ui/navigation/TabNavigation/TabNavigationItem'
import { HStack } from '@lib/ui/layout/Stack'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { Text } from '@lib/ui/text'
import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'
import { useHasHabits } from '../hooks/useHasHabits'
import { CheckSquareIcon } from '@lib/ui/icons/CheckSquareIcon'
import { EditIcon } from '@lib/ui/icons/EditIcon'
import { TableIcon } from '@lib/ui/icons/TableIcon'

const myHabitsViews = ['track', 'report', 'manage'] as const
type MyHabitsView = (typeof myHabitsViews)[number]

export const useMyHabitsView = () => {
  const hasHabits = useHasHabits()

  return useStateCorrector(
    usePersistentState<MyHabitsView>(
      PersistentStateKey.MyHabitsView,
      hasHabits ? 'track' : 'manage',
    ),
    useCallback(
      (state) => {
        if (!hasHabits) {
          return 'manage'
        }

        return state
      },
      [hasHabits],
    ),
  )
}

const myHabitsViewIcon: Record<MyHabitsView, React.ReactNode> = {
  track: <CheckSquareIcon />,
  manage: <EditIcon />,
  report: <TableIcon />,
}

export const MyHabitsViewSelector = () => {
  const id = useId()
  const [view, setView] = useMyHabitsView()

  const hasHabits = useHasHabits()

  if (!hasHabits) {
    return null
  }

  return (
    <HStack gap={4}>
      {myHabitsViews.map((value) => (
        <TabNavigationItem
          isSelected={value === view}
          onSelect={() => setView(value)}
          value={value}
          key={value}
          groupName={id}
        >
          <HStack alignItems="center" gap={8}>
            <IconWrapper>{myHabitsViewIcon[value]}</IconWrapper>
            <Text>{capitalizeFirstLetter(value)}</Text>
          </HStack>
        </TabNavigationItem>
      ))}
    </HStack>
  )
}
