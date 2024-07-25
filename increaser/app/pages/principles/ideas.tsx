import { withLayout } from '@lib/next-ui/utils/withLayout'
import { ExplorePrinciples } from '@increaser/ui/principles/ExplorePrinciples'
import { PrinciplesPageLayout } from '../../principles/PrinciplesPageLayout'

export default withLayout({
  page: ExplorePrinciples,
  layout: PrinciplesPageLayout,
})
