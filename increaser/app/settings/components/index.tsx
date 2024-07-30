import { SignOut } from '@increaser/app/components/account/SignOut'
import { FixedWidthContent } from '@increaser/app/components/reusable/fixed-width-content'
import { VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { useUserState } from '@increaser/ui/user/UserStateContext'
import { UserStateOnly } from '@increaser/app/user/state/UserStateOnly'
import { PageTitle } from '@increaser/app/ui/PageTitle'
import { Page } from '@lib/next-ui/Page'

const title = 'Account'

export const SettingsPage: Page = () => {
  const { state } = useUserState()

  return (
    <FixedWidthContent>
      <PageTitle title={title} documentTitle={`⚙️ ${title}`} />
      <UserStateOnly>
        <VStack gap={16}>
          <Text color="contrast">{state?.email}</Text>
          <VStack alignItems="start">
            <SignOut />
          </VStack>
        </VStack>
      </UserStateOnly>
    </FixedWidthContent>
  )
}
