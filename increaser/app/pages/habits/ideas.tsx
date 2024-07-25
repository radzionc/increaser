import { CuratedHabits } from '../../habits/components/CuratedHabits'
import { withLayout } from '@lib/next-ui/utils/withLayout'
import { HabitsLayout } from '../../habits/components/HabitsLayout'

export default withLayout({
  page: CuratedHabits,
  layout: HabitsLayout,
})
