import { withLayout } from '@lib/next-ui/utils/withLayout'
import { Goals } from '../../goals/Goals'
import { GoalsLayout } from '../../goals/GoalsLayout'

export default withLayout({
  page: Goals,
  layout: GoalsLayout,
})
