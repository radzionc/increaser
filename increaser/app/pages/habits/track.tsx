import { withLayout } from '@lib/next-ui/utils/withLayout'
import { HabitsLayout } from '../../habits/components/HabitsLayout'
import { TrackHabits } from '../../habits/components/track/TrackHabits'

export default withLayout({
  page: TrackHabits,
  layout: HabitsLayout,
})
