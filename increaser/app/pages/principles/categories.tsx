import { withLayout } from '@lib/next-ui/utils/withLayout'
import { PrinciplesPageLayout } from '../../principles/PrinciplesPageLayout'
import { PrincipleCategories } from '@increaser/ui/principles/categories/PrincipleCategories'

export default withLayout({
  page: PrincipleCategories,
  layout: PrinciplesPageLayout,
})
