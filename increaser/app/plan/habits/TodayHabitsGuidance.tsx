import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { useYesterdayHabits } from '../../habits/hooks/useYesterdayHabits'
import { MS_IN_DAY } from '@lib/utils/time'
import { toHabitDate } from '@increaser/entities-utils/habit/toHabitDate'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { Text } from '@lib/ui/text'
import { EmojiTextPrefix } from '@lib/ui/text/EmojiTextPrefix'
import { SectionTitle } from '@lib/ui/text/SectionTitle'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { HabitsAdvice } from './HabitsAdvice'
import styled from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'
import { Panel } from '@lib/ui/panel/Panel'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { TriangleAlertIcon } from '@lib/ui/icons/TriangleAlertIcon'

const Content = styled(VStack)`
  gap: 20px;
  color: ${getColor('textSupporting')};
  font-size: 14px;
  line-height: 1.5;
`

const AlertIcon = styled(IconWrapper)`
  color: ${getColor('idle')};
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
    <>
      {isEmpty(failedHabits) ? (
        <Panel>
          <Text size={14} color="contrast" height="large" weight="semibold">
            <EmojiTextPrefix emoji="🎉" />
            Fantastic! You checked off all your habits yesterday. Keep that
            momentum going!
          </Text>
        </Panel>
      ) : (
        <Panel>
          <Content gap={20}>
            <SectionTitle>
              Keep the momentum – don’t miss habits two days in a row!
            </SectionTitle>
            <VStack gap={4}>
              <HStack alignItems="center" gap={8}>
                <AlertIcon>
                  <TriangleAlertIcon />
                </AlertIcon>
                <Text height="large">
                  Yesterday, you missed{' '}
                  {failedHabits.length > 1 ? 'these habits' : 'this habit'}:
                </Text>
              </HStack>
              {failedHabits.map(({ name, id }, index) => (
                <Text weight="semibold" color="contrast" key={id}>
                  {index + 1}. {name}
                </Text>
              ))}
            </VStack>
            <HabitsAdvice />
          </Content>
        </Panel>
      )}
    </>
  )
}
