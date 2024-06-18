import { FixedWidthContent } from '../components/reusable/fixed-width-content'
import { PageTitle } from '../ui/PageTitle'

import { UserStateOnly } from '../user/state/UserStateOnly'
import { VStack } from '@lib/ui/layout/Stack'
import { StartDayStages } from './StartDayStages'

const title = 'Start the day'

export const PlanPage = () => {
  return (
    <FixedWidthContent>
      <PageTitle documentTitle={`☕️ ${title}`} title={title} />
      <UserStateOnly>
        <VStack style={{ maxWidth: 580 }}>
          <StartDayStages />
        </VStack>
      </UserStateOnly>
    </FixedWidthContent>
  )
}
