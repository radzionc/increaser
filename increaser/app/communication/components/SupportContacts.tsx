import { ExternalLink } from '@increaser/app/router/Link/ExternalLink'
import {
  AUTHOR_EMAIL,
  AUTHOR_LINKEDIN,
  AUTHOR_TELEGRAM,
  AUTHOR_TWITTER,
} from '@increaser/app/shared/externalResources'
import { IconCentricButton } from '@lib/ui/buttons/IconCentricButton'
import { EnvelopIcon } from '@lib/ui/icons/EnvelopIcon'
import { LinkedinIcon } from '@lib/ui/icons/LinkedinIcon'
import { TelegramIcon } from '@lib/ui/icons/TelegramIcon'
import { TwitterIcon } from '@lib/ui/icons/TwitterIcon'
import { VStack } from '@lib/ui/layout/Stack'

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
