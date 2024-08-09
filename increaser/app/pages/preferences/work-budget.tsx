import { withLayout } from '@lib/next-ui/utils/withLayout'
import { PreferencesLayout } from '../../preferences/PreferencesLayout'
import { WorkBudget } from '../../workBudget/WorkBudget'

export default withLayout({
  page: WorkBudget,
  layout: PreferencesLayout,
})
