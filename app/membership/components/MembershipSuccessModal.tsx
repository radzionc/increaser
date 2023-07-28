import { ExternalLink } from 'router/Link/ExternalLink'
import {
  AUTHOR_LINKEDIN,
  AUTHOR_TELEGRAM,
  AUTHOR_TWITTER,
} from 'shared/externalResources'
import { TextButton } from '@increaser/ui/ui/buttons/TextButton'
import { Modal } from '@increaser/ui/ui/Modal'
import { VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'

import { useMembership } from './MembershipContext'
import { EmojiTextPrefix } from 'ui/EmojiTextPrefix'

export const MembershipSuccessModal = () => {
  const { closeMembershipSuccessModal } = useMembership()

  return (
    <Modal
      title={
        <Text>
          <EmojiTextPrefix emoji="😊" />
          You're amazing
        </Text>
      }
      onClose={closeMembershipSuccessModal}
      renderContent={() => (
        <VStack gap={16}>
          <Text color="supporting" size={18}>
            <EmojiTextPrefix emoji="👋" />
            Hi, Radzion is here. I'm thrilled to help you get more productive!
          </Text>
          <Text color="supporting" size={18}>
            <EmojiTextPrefix emoji="🍻" />
            Say "Hi" to me on{' '}
            <ExternalLink to={AUTHOR_TWITTER}>
              <TextButton as="span" text="Twitter" />
            </ExternalLink>
            ,{' '}
            <ExternalLink to={AUTHOR_LINKEDIN}>
              <TextButton as="span" text="LinkedIn" />
            </ExternalLink>
            , or{' '}
            <ExternalLink to={AUTHOR_TELEGRAM}>
              <TextButton as="span" text="Telegram" />
            </ExternalLink>
          </Text>
        </VStack>
      )}
    />
  )
}
