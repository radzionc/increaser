import { withLayout } from '@lib/next-ui/utils/withLayout'
import { GoalsLayout } from '../goals/GoalsLayout'
import { Goals } from '../goals/Goals'

export default withLayout({
  page: Goals,
  layout: GoalsLayout,
})
