import { withLayout } from '@lib/next-ui/utils/withLayout'
import { ManagePrinciples } from '@increaser/ui/principles/ManagePrinciples'
import { PrinciplesPageLayout } from '../../principles/PrinciplesPageLayout'

export default withLayout({
  page: ManagePrinciples,
  layout: PrinciplesPageLayout,
})
