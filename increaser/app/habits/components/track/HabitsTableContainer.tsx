import { HStack, VStack } from '@lib/ui/css/stack'
import { ScrollableFlexboxFiller } from '@lib/ui/layout/ScrollableFlexboxFiller'
import { Spacer } from '@lib/ui/layout/Spacer'
import { trackHabitsConfig } from './config'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { Habits } from '../manage/Habits'

export const HabitsTableContainer = ({
  children,
}: ComponentWithChildrenProps) => {
  return (
    <HStack gap={40}>
      <VStack>
        <Spacer height={trackHabitsConfig.labelHeight} />
        <VStack>
          <ActiveItemIdProvider initialValue={null}>
            <Habits />
          </ActiveItemIdProvider>
        </VStack>
        <Spacer height={20} />
      </VStack>
      <ScrollableFlexboxFiller>{children}</ScrollableFlexboxFiller>
    </HStack>
  )
}
