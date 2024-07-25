import { withLayout } from '@lib/next-ui/utils/withLayout'
import { MyHabits } from '../../habits/components/MyHabits'
import { HabitsLayout } from '../../habits/components/HabitsLayout'

export default withLayout({
  page: MyHabits,
  layout: HabitsLayout,
})
