import { HStack, VStack } from '@lib/ui/css/stack'
import { ScrollableFlexboxFiller } from '@lib/ui/layout/ScrollableFlexboxFiller'
import { Spacer } from '@lib/ui/layout/Spacer'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { ChildrenProp } from '@lib/ui/props'
import { ActiveHabit } from '@product/ui/habits/ActiveHabit'

import { ActiveHabits } from '../manage/ActiveHabits'
import { InactiveHabits } from '../manage/InactiveHabits'

import { trackHabitsConfig } from './config'

export const HabitsTableContainer = ({ children }: ChildrenProp) => {
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
