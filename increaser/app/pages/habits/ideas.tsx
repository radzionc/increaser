import { withLayout } from '@lib/next-ui/utils/withLayout'
import { HabitsLayout } from '../../habits/HabitsLayout'
import { HabitIdeasPage } from '../../habits/HabitIdeasPage'

export default withLayout({
  page: HabitIdeasPage,
  layout: HabitsLayout,
})
