import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { useYesterdayHabits } from '../../habits/hooks/useYesterdayHabits'
import { MS_IN_DAY } from '@lib/utils/time'
import { toHabitDate } from '@increaser/entities-utils/habit/toHabitDate'
import { Panel } from '@lib/ui/panel/Panel'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { Text } from '@lib/ui/text'
import { EmojiTextPrefix } from '@lib/ui/text/EmojiTextPrefix'
import { SectionTitle } from '@lib/ui/text/SectionTitle'
import { VStack } from '@lib/ui/layout/Stack'
import { HabitsAdvice } from './HabitsAdvice'
import styled from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'

const Content = styled(VStack)`
  gap: 20px;
  color: ${getColor('textSupporting')};
  /* font-size: 14px; */
  line-height: 1.5;
`

export const TodayHabitsGuidance = () => {
  const startOfToday = useStartOfDay()

  const habits = useYesterdayHabits()

  const startOfYesterday = startOfToday - MS_IN_DAY
  const startOfYesterdayDate = new Date(startOfYesterday)

  const failedHabits = habits.filter(
    (habit) => !habit.successes.includes(toHabitDate(startOfYesterdayDate)),
  )

  return (
    <Panel kind="secondary">
      {isEmpty(failedHabits) ? (
        <Text height="large" weight="semibold">
          <EmojiTextPrefix emoji="🎉" />
          Fantastic! You checked off all your habits yesterday. Keep that
          momentum going!
        </Text>
      ) : (
        <Content gap={20}>
          <SectionTitle>
            Keep the momentum – don’t miss habits two days in a row!
          </SectionTitle>
          <VStack gap={4}>
            <Text height="large">
              Yesterday, you missed{' '}
              {failedHabits.length > 1 ? 'these habits' : 'this habit'}:
            </Text>
            {failedHabits.map(({ emoji, name, id }) => (
              <Text
                weight="semibold"
                color="regular"
                style={{ marginLeft: 8 }}
                key={id}
              >
                <EmojiTextPrefix emoji={emoji} />
                {name}
              </Text>
            ))}
          </VStack>
          <HabitsAdvice />
        </Content>
      )}
    </Panel>
  )
}
