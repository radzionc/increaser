import { FixedWidthContent } from '../components/reusable/fixed-width-content'
import { PageTitle } from '../ui/PageTitle'
import { UserStateOnly } from '../user/state/UserStateOnly'
import { Goals } from './Goals'

const title = 'Your goals'

export const GoalsPage = () => {
  return (
    <FixedWidthContent>
      <PageTitle documentTitle={`⏳ ${title}`} title={title} />
      <UserStateOnly>
        <Goals />
      </UserStateOnly>
    </FixedWidthContent>
  )
}
