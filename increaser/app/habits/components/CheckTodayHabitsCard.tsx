import { Panel } from '@lib/ui/panel/Panel'

import { CheckTodayHabits } from '@increaser/ui/habits/CheckTodayHabits'
import { TwoDayRuleEducation } from './CheckDayHabits/TwoDayRuleEducation'
import { useHabits } from '@increaser/ui/habits/HabitsContext'

export const CheckTodayHabitsCard = () => {
  const { habits } = useHabits()

  if (!habits.length) return null

  return (
    <Panel kind="secondary">
      <CheckTodayHabits education={<TwoDayRuleEducation />} />
    </Panel>
  )
}
