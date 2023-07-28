import { Panel } from '@increaser/ui/ui/Panel/Panel'

import { CheckTodayHabits } from './CheckDayHabits/CheckTodayHabits'
import { useHabits } from './HabitsProvider'

export const CheckTodayHabitsCard = () => {
  const { habits } = useHabits()

  if (!habits.length) return null

  return (
    <Panel kind="secondary">
      <CheckTodayHabits />
    </Panel>
  )
}
