import { withLayout } from '@lib/next-ui/utils/withLayout'
import { HabitsLayout } from '../../habits/HabitsLayout'
import { TrackHabitsPage } from '../../habits/TrackHabitsPage'

export default withLayout({
  page: TrackHabitsPage,
  layout: HabitsLayout,
})
