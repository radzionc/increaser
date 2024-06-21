import { FixedWidthContent } from '../../components/reusable/fixed-width-content'
import { PageTitle } from '../../ui/PageTitle'
import { UserStateOnly } from '../../user/state/UserStateOnly'
import { PlanDayProvider } from './PlanDayProvider'

const title = 'Start the day'

export const PlanDayPage = () => {
  return (
    <FixedWidthContent>
      <PageTitle documentTitle={`☕️ ${title}`} title={title} />
      <UserStateOnly>
        <PlanDayProvider>coming soon!</PlanDayProvider>
      </UserStateOnly>
    </FixedWidthContent>
  )
}
