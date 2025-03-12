import { withLayout } from '@lib/next-ui/utils/withLayout'

import { HabitIdeasPage } from '../../habits/HabitIdeasPage'
import { HabitsLayout } from '../../habits/HabitsLayout'

export default withLayout({
  page: HabitIdeasPage,
  layout: HabitsLayout,
})
