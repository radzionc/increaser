import { withLayout } from '@lib/next-ui/utils/withLayout'
import { PreferencesLayout } from '../../preferences/PreferencesLayout'
import { Schedule } from '../../schedule/Schedule'

export default withLayout({
  page: Schedule,
  layout: PreferencesLayout,
})
