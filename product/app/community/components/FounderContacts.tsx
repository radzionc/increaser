import { Button } from '@lib/ui/buttons/Button'
import { SocialLink } from '@lib/ui/buttons/SocialLink'
import { Panel } from '@lib/ui/css/panel'
import { round } from '@lib/ui/css/round'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { HStack, VStack } from '@lib/ui/css/stack'
import { EnvelopIcon } from '@lib/ui/icons/EnvelopIcon'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { LinkedinIcon } from '@lib/ui/icons/LinkedinIcon'
import { TelegramIcon } from '@lib/ui/icons/TelegramIcon'
import { XIcon } from '@lib/ui/icons/XIcon'
import { CoverImage } from '@lib/ui/images/CoverImage'
import { SafeImage } from '@lib/ui/images/SafeImage'
import { ExternalLink } from '@lib/ui/navigation/Link/ExternalLink'
import { Text } from '@lib/ui/text'
import { getColor } from '@lib/ui/theme/getters'
import {
  founderEmail,
  founderLinkedInUrl,
  founderTelegramUrl,
  founderXUrl,
  productName,
} from '@product/config'
import { getAppPath } from '@product/ui/navigation/app'
import Link from 'next/link'
import styled from 'styled-components'

const Avatar = styled(CoverImage)`
  ${round};
  ${sameDimensions(40)}
  border: 1px solid ${getColor('primary')};
`

const PromptLink = styled(Link)`
  font-weight: 600;
  color: ${getColor('textPrimary')};
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
            <Text color="contrast" weight="500">
              Radzion
            </Text>
            <Text size={14} color="supporting">
              {productName} Founder
            </Text>
          </VStack>
        </HStack>
        <Text height="l" color="contrast">
          👋 Hi there! Have any questions about {productName}? Feel free to ask!
          If you have a great idea for a new feature,{' '}
          <PromptLink href={getAppPath('roadmap', 'ideas')}>
            share it here
          </PromptLink>{' '}
          so others can vote on it!
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
