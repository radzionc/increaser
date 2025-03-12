import { withLayout } from '@lib/next-ui/utils/withLayout'
import { PrincipleCategories } from '@product/ui/principles/categories/PrincipleCategories'

import { PrinciplesPageLayout } from '../../principles/PrinciplesPageLayout'

export default withLayout({
  page: PrincipleCategories,
  layout: PrinciplesPageLayout,
})
