import { Panel } from '@lib/ui/panel/Panel'
import { HStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { CheckCircleIcon } from '@lib/ui/icons/CheckCircleIcon'
import { useAssertUserState } from '@increaser/app/user/state/UserStateContext'
import { AppSumoCodeRedemption } from './AppSumoCodeRedemption'

export const AppSumoPageContent = () => {
  const { lifeTimeDeal } = useAssertUserState()

  if (lifeTimeDeal && lifeTimeDeal.provider === 'appsumo') {
    return (
      <HStack alignItems="center" gap={8}>
        <Text color="success">
          <CheckCircleIcon />
        </Text>
        AppSumo code redeemed
      </HStack>
    )
  }

  return (
    <Panel width={380}>
      <AppSumoCodeRedemption />
    </Panel>
  )
}
