import {
  founderEmail,
  founderLinkedInUrl,
  founderTelegramUrl,
  founderXUrl,
  productName,
} from '@increaser/config'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Panel } from '@lib/ui/panel/Panel'
import { Text } from '@lib/ui/text'
import { SafeImage } from '@lib/ui/images/SafeImage'
import { CoverImage } from '@lib/ui/images/CoverImage'
import styled from 'styled-components'
import { round } from '@lib/ui/css/round'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { getColor } from '@lib/ui/theme/getters'
import { Button } from '@lib/ui/buttons/Button'
import { EnvelopIcon } from '@lib/ui/icons/EnvelopIcon'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { ExternalLink } from '@lib/ui/navigation/Link/ExternalLink'
import { XIcon } from '@lib/ui/icons/XIcon'
import { LinkedinIcon } from '@lib/ui/icons/LinkedinIcon'
import { TelegramIcon } from '@lib/ui/icons/TelegramIcon'
import { SocialLink } from '@lib/ui/buttons/SocialLink'

const Avatar = styled(CoverImage)`
  ${round};
  ${sameDimensions(40)}
  border: 1px solid ${getColor('primary')};
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
              Radzion
            </Text>
            <Text size={14} color="supporting">
              {productName} Founder
            </Text>
          </VStack>
        </HStack>
        <Text height="large" color="contrast">
          👋 Hi there! Have any questions about {productName}? Feel free to ask!
          If you have a great idea for a new feature, share it here so others
          can vote on it!
        </Text>
        <HStack alignItems="center" wrap="wrap" justifyContent="space-between">
          <ExternalLink to={`mailto:${founderEmail}`}>
            <Button kind="secondary" as="div">
              <HStack alignItems="center" gap={8}>
                <IconWrapper>
                  <EnvelopIcon />
                </IconWrapper>
                <Text>Get in touch</Text>
              </HStack>
            </Button>
          </ExternalLink>
          <HStack gap={4} alignItems="center">
            <SocialLink to={founderXUrl}>
              <XIcon />
            </SocialLink>
            <SocialLink to={founderLinkedInUrl}>
              <LinkedinIcon />
            </SocialLink>
            <SocialLink to={founderTelegramUrl}>
              <TelegramIcon />
            </SocialLink>
          </HStack>
        </HStack>
      </VStack>
    </Panel>
  )
}
