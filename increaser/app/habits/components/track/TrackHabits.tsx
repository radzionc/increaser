import { useHabits } from '@increaser/ui/habits/HabitsContext'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { TrackHabitsColumn } from './TrackHabitsColumn'
import { Text } from '@lib/ui/text'
import { EmojiTextPrefix } from '@lib/ui/text/EmojiTextPrefix'
import { ScrollableFlexboxFiller } from '@lib/ui/layout/ScrollableFlexboxFiller'
import { Spacer } from '@lib/ui/layout/Spacer'
import { trackHabitsConfig } from './config'
import { TrackHabitsProvider } from './TrackHabitsProvider'
import { HabitColumns } from './HabitColumns'

export const TrackHabits = () => {
  const { habits } = useHabits()

  return (
    <HStack gap={20}>
      <VStack>
        <Spacer height={trackHabitsConfig.labelHeight} />
        <TrackHabitsColumn>
          {habits.map(({ emoji, name }) => (
            <Text size={14} weight="semibold" color="contrast">
              <EmojiTextPrefix size={16} emoji={emoji} />
              {name}
            </Text>
          ))}
        </TrackHabitsColumn>
        <Spacer height={trackHabitsConfig.labelHeight} />
      </VStack>
      <ScrollableFlexboxFiller>
        <TrackHabitsProvider>
          <HabitColumns />
        </TrackHabitsProvider>
      </ScrollableFlexboxFiller>
    </HStack>
  )
}
