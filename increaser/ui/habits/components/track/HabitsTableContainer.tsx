import { HStack, VStack } from '@lib/ui/css/stack'
import { ScrollableFlexboxFiller } from '@lib/ui/layout/ScrollableFlexboxFiller'
import { Spacer } from '@lib/ui/layout/Spacer'
import { trackHabitsConfig } from './config'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { ActiveHabits } from '../manage/ActiveHabits'
import { ActiveHabit } from '@increaser/ui/habits/ActiveHabit'
import { InactiveHabits } from '../manage/InactiveHabits'

export const HabitsTableContainer = ({
  children,
}: ComponentWithChildrenProps) => {
  return (
    <ActiveItemIdProvider initialValue={null}>
      <ActiveHabit />
      <HStack fullWidth gap={40}>
        <VStack>
          <Spacer height={trackHabitsConfig.labelHeight} />
          <VStack>
            <ActiveHabits />
          </VStack>
          <Spacer height={20} />
          <InactiveHabits />
        </VStack>
        <ScrollableFlexboxFiller hideScrollbars>
          {children}
        </ScrollableFlexboxFiller>
      </HStack>
    </ActiveItemIdProvider>
  )
}
