import { Panel } from '@increaser/ui/ui/Panel/Panel'
import { HStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { CheckCircleIcon } from '@increaser/ui/icons/CheckCircleIcon'
import { useAssertUserState } from 'user/state/UserStateContext'
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
