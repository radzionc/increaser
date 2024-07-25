import { DoneGoals } from '../../goals/DoneGoals'
import { withLayout } from '@lib/next-ui/utils/withLayout'
import { GoalsLayout } from '../../goals/GoalsLayout'

export default withLayout({
  page: DoneGoals,
  layout: GoalsLayout,
})
