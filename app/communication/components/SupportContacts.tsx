import { ExternalLink } from 'router/Link/ExternalLink'
import {
  AUTHOR_EMAIL,
  AUTHOR_LINKEDIN,
  AUTHOR_TELEGRAM,
  AUTHOR_TWITTER,
} from 'shared/externalResources'
import { IconCentricButton } from '@increaser/ui/ui/buttons/IconCentricButton'
import { EnvelopIcon } from '@increaser/ui/ui/icons/EnvelopIcon'
import { LinkedinIcon } from '@increaser/ui/ui/icons/LinkedinIcon'
import { TelegramIcon } from '@increaser/ui/ui/icons/TelegramIcon'
import { TwitterIcon } from '@increaser/ui/ui/icons/TwitterIcon'
import { VStack } from '@increaser/ui/ui/Stack'

export const SupportContacts = () => (
  <VStack fullWidth gap={12}>
    <ExternalLink to={AUTHOR_TWITTER}>
      <IconCentricButton
        as="div"
        text="Message on Twitter"
        icon={<TwitterIcon />}
      />
    </ExternalLink>
    <ExternalLink to={AUTHOR_LINKEDIN}>
      <IconCentricButton
        as="div"
        text="Message on LinkedIn"
        icon={<LinkedinIcon />}
      />
    </ExternalLink>
    <ExternalLink to={AUTHOR_TELEGRAM}>
      <IconCentricButton
        as="div"
        text="Message on Telegram"
        icon={<TelegramIcon />}
      />
    </ExternalLink>
    <ExternalLink to={`mailto:${AUTHOR_EMAIL}`}>
      <IconCentricButton as="div" text="Send an email" icon={<EnvelopIcon />} />
    </ExternalLink>
  </VStack>
)
