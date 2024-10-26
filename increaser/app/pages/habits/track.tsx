import { withLayout } from '@lib/next-ui/utils/withLayout'
import { HabitsLayout } from '../../habits/components/HabitsLayout'
import { TrackHabitsPage } from '../../habits/components/track/TrackHabitsPage'

export default withLayout({
  page: TrackHabitsPage,
  layout: HabitsLayout,
})
