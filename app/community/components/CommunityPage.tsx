import { Page } from 'components/Page'
import { FixedWidthContent } from 'components/reusable/fixed-width-content'
import { PageTitle } from 'ui/PageTitle'
import { CurrentMonthUsers } from './CurrentMonthUsers'
import { HStack } from '@increaser/ui/ui/Stack'
import { PublicProfile } from './PublicProfile'
import { UserStateOnly } from 'user/state/UserStateOnly'

export const CommunityPage: Page = () => {
  return (
    <FixedWidthContent>
      <PageTitle documentTitle={`👋 Community`} title={`Community`} />
      <UserStateOnly>
        <HStack alignItems="start" wrap="wrap" gap={40}>
          <CurrentMonthUsers />
          <PublicProfile />
        </HStack>
      </UserStateOnly>
    </FixedWidthContent>
  )
}
