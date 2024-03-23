import { productName } from '@increaser/config'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Panel } from '@lib/ui/panel/Panel'
import { Text } from '@lib/ui/text'
import { SafeImage } from '@lib/ui/images/SafeImage'
import { CoverImage } from '@lib/ui/images/CoverImage'
import styled from 'styled-components'
import { round } from '@lib/ui/css/round'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { getColor } from '@lib/ui/theme/getters'
import { InlineFounderContacts } from '../../info/components/InflineFounderContacts'

const Avatar = styled(CoverImage)`
  ${round};
  ${sameDimensions(40)}
  border: 1px solid ${getColor('success')};
`

export const FounderContacts = () => {
  return (
    <Panel>
      <VStack gap={24}>
        <HStack alignItems="center" gap={20}>
          <SafeImage
            src="/images/founder-avatar.webp"
            render={(props) => <Avatar {...props} />}
          />
          <VStack>
            <Text color="contrast" weight="semibold">
              Radzion Chachura
            </Text>
            <Text size={14} color="supporting">
              {productName} Founder
            </Text>
          </VStack>
        </HStack>
        <Text height="large" color="contrast">
          👋 Hey there! Feel free to ask me anything about {productName}. Have a
          great idea for a new feature? Share it in the "Product Features"
          section for others to vote on!
        </Text>
        <InlineFounderContacts />
      </VStack>
    </Panel>
  )
}
