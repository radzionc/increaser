import { VStack } from '@lib/ui/css/stack'
import { Text } from '@lib/ui/text'
import { MembersTelegram } from '@product/app/communication/MembersTelegram'
import { productName } from '@product/config'

export const MembershipOverview = () => {
  return (
    <VStack fullWidth gap={20}>
      <Text>
        {productName} is now completely free for everyone! Enjoy all the
        features without any subscription.
      </Text>
      <MembersTelegram />
    </VStack>
  )
}
