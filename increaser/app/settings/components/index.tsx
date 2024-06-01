import { SignOut } from '@increaser/app/components/account/SignOut'
import { FixedWidthContent } from '@increaser/app/components/reusable/fixed-width-content'
import { VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { useUserState } from '@increaser/ui/user/UserStateContext'
import { UserStateOnly } from '@increaser/app/user/state/UserStateOnly'
import { NamedSection } from '@increaser/app/ui/NamedSection'
import { PageTitle } from '@increaser/app/ui/PageTitle'
import { ThemeSelector } from '@increaser/app/ui/ThemeSelector'
import { Page } from '@lib/next-ui/Page'

const title = 'Settings'

export const SettingsPage: Page = () => {
  const { state } = useUserState()

  return (
    <FixedWidthContent>
      <PageTitle title={title} documentTitle={`⚙️ ${title}`} />
      <UserStateOnly>
        <VStack style={{ maxWidth: 600 }} gap={40}>
          <NamedSection name="Preferences">
            <ThemeSelector />
          </NamedSection>
          <NamedSection name="Account">
            <Text>{state?.email}</Text>
            <VStack alignItems="start">
              <SignOut />
            </VStack>
          </NamedSection>
        </VStack>
      </UserStateOnly>
    </FixedWidthContent>
  )
}
