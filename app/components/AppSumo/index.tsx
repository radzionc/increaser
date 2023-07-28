import { useAuth } from 'auth/hooks/useAuth'
import { Panel } from '@increaser/ui/ui/Panel/Panel'
import { VStack } from '@increaser/ui/ui/Stack'

import { AppSumoAuth } from './AppSumoAuth'
import { AppSumoCodeRedemption } from './AppSumoCodeRedemption'
import { AppSumoHeader } from './AppSumoHeader'

export const AppSumoPage = () => {
  const { isUserLoggedIn } = useAuth()

  return (
    <VStack fullHeight fullWidth alignItems="center" justifyContent="center">
      <Panel width={380}>
        <VStack fullWidth alignItems="center" gap={20}>
          <AppSumoHeader />
          {isUserLoggedIn ? <AppSumoCodeRedemption /> : <AppSumoAuth />}
        </VStack>
      </Panel>
    </VStack>
  )
}
