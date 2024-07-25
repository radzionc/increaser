import { MyHabits } from '../../habits/components/MyHabits'
import { withLayout } from '@lib/next-ui/utils/withLayout'
import { HabitsLayout } from '../../habits/components/HabitsLayout'

export default withLayout({
  page: MyHabits,
  layout: HabitsLayout,
})
