import { withLayout } from '@lib/next-ui/utils/withLayout'
import { ExplorePrinciples } from '@product/ui/principles/explore/ExplorePrinciples'

import { PrinciplesPageLayout } from '../../principles/PrinciplesPageLayout'

export default withLayout({
  page: ExplorePrinciples,
  layout: PrinciplesPageLayout,
})
