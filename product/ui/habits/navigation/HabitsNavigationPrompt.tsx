import { borderRadius } from '@lib/ui/css/borderRadius'
import { centerContent } from '@lib/ui/css/centerContent'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { hStack } from '@lib/ui/css/stack'
import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { SquareIcon } from '@lib/ui/icons/SquareIcon'
import { text } from '@lib/ui/text'
import { getColor } from '@lib/ui/theme/getters'
import { toHabitDate } from '@product/entities-utils/habit/toHabitDate'
import { subDays } from 'date-fns'
import { useMemo } from 'react'
import styled from 'styled-components'

import { useActiveHabits } from '../hooks/useActiveHabits'

const Position = styled.div`
  position: absolute;
  right: 8px;
`

const Container = styled.div`
  height: 24px;
  ${centerContent};
  ${horizontalPadding(8)};
  ${borderRadius.s};
  background: ${getColor('mist')};

  ${text({
    size: 14,
    weight: 600,
    height: 's',
    color: 'idle',
  })}
  ${hStack({
    alignItems: 'center',
    gap: 4,
  })}
    svg {
    color: ${getColor('idle')};
  }
`

export const HabitsNavigationPrompt = () => {
  const todayStartedAt = useStartOfDay()
  const habits = useActiveHabits()

  const hasUncheckedYesterdayHabits = useMemo(() => {
    const yesterdayStartedAt = subDays(todayStartedAt, 1).getTime()

    const yesterdayHabitDate = toHabitDate(yesterdayStartedAt)

    const matchingHabits = habits.filter(
      ({ startedAt }) => startedAt <= yesterdayStartedAt,
    )

    return matchingHabits.some(
      ({ successes }) => !successes.includes(yesterdayHabitDate),
    )
  }, [habits, todayStartedAt])

  if (!hasUncheckedYesterdayHabits) return null

  return (
    <Position>
      <Container>
        <SquareIcon />
        Review
      </Container>
    </Position>
  )
}
