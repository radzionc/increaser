import {
  PersistentStateKey,
  usePersistentState,
} from '@increaser/ui/state/persistentState'
import { useStateCorrector } from '@lib/ui/state/useStateCorrector'
import { useCallback, useId } from 'react'
import { useHasVision } from '@increaser/ui/vision/hooks/useHasVision'
import { TabNavigationItem } from '@lib/ui/navigation/TabNavigation/TabNavigationItem'
import { HStack } from '@lib/ui/layout/Stack'
import { GridIcon } from '@lib/ui/icons/GridIcon'
import { EditIcon } from '@lib/ui/icons/EditIcon'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { Text } from '@lib/ui/text'
import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'

export const myVisionViews = ['board', 'manage'] as const
export type MyVisionView = (typeof myVisionViews)[number]

export const useMyVisionView = () => {
  const hasVision = useHasVision()

  return useStateCorrector(
    usePersistentState<MyVisionView>(
      PersistentStateKey.MyVisionView,
      hasVision ? 'board' : 'manage',
    ),
    useCallback(
      (state) => {
        if (!hasVision) {
          return 'manage'
        }

        return state
      },
      [hasVision],
    ),
  )
}

const myVisionViewIcon: Record<MyVisionView, React.ReactNode> = {
  board: <GridIcon />,
  manage: <EditIcon />,
}

export const MyVisionViewSelector = () => {
  const id = useId()
  const [view, setView] = useMyVisionView()

  const hasVision = useHasVision()

  if (!hasVision) {
    return null
  }

  return (
    <HStack gap={4}>
      {myVisionViews.map((value) => (
        <TabNavigationItem
          isSelected={value === view}
          onSelect={() => setView(value)}
          value={value}
          key={value}
          groupName={id}
        >
          <HStack alignItems="center" gap={8}>
            <IconWrapper>{myVisionViewIcon[value]}</IconWrapper>
            <Text>{capitalizeFirstLetter(value)}</Text>
          </HStack>
        </TabNavigationItem>
      ))}
    </HStack>
  )
}
