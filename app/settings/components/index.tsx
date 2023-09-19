import { SignOut } from 'components/account/SignOut'
import { FixedWidthContent } from 'components/reusable/fixed-width-content'
import { InlineFounderContacts } from 'info/components/InflineFounderContacts'
import { VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { useUserState } from 'user/state/UserStateContext'
import { UserStateOnly } from 'user/state/UserStateOnly'
import { NamedSection } from 'ui/NamedSection'
import { PageTitle } from 'ui/PageTitle'
import { ThemeSelector } from 'ui/ThemeSelector'
import { Page } from 'layout/Page'
import { MembershipOverview } from 'membership/components/MembershipOverview'

const title = 'Settings'

export const SettingsPage: Page = () => {
  const { state } = useUserState()

  return (
    <FixedWidthContent>
      <PageTitle title={title} documentTitle={`⚙️ ${title}`} />
      <UserStateOnly>
        <VStack style={{ maxWidth: 600 }} gap={40}>
          <NamedSection name="Membership">
            <MembershipOverview />
          </NamedSection>
          <NamedSection name="Preferences">
            <ThemeSelector />
          </NamedSection>
          <NamedSection name="Account">
            <Text>{state?.email}</Text>
            <VStack alignItems="start">
              <SignOut />
            </VStack>
          </NamedSection>
          <NamedSection name="Contact founder">
            <InlineFounderContacts />
          </NamedSection>
        </VStack>
      </UserStateOnly>
    </FixedWidthContent>
  )
}
