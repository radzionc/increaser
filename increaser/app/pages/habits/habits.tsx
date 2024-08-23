import { withLayout } from '@lib/next-ui/utils/withLayout'
import { HabitsLayout } from '../../habits/components/HabitsLayout'
import { ManageHabits } from '../../habits/components/manage/ManageHabits'

export default withLayout({
  page: ManageHabits,
  layout: HabitsLayout,
})
