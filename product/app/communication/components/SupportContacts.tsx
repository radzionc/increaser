import { IconCentricButton } from '@lib/ui/buttons/IconCentricButton'
import { VStack } from '@lib/ui/css/stack'
import { EnvelopIcon } from '@lib/ui/icons/EnvelopIcon'
import { LinkedinIcon } from '@lib/ui/icons/LinkedinIcon'
import { TelegramIcon } from '@lib/ui/icons/TelegramIcon'
import { XIcon } from '@lib/ui/icons/XIcon'
import { ExternalLink } from '@lib/ui/navigation/Link/ExternalLink'
import {
  founderEmail,
  founderLinkedInUrl,
  founderTelegramUrl,
  founderXUrl,
} from '@product/config'

export const SupportContacts = () => (
  <VStack fullWidth gap={12}>
    <ExternalLink to={founderXUrl}>
      <IconCentricButton as="div" text="Message on X" icon={<XIcon />} />
    </ExternalLink>
    <ExternalLink to={founderLinkedInUrl}>
      <IconCentricButton
        as="div"
        text="Message on LinkedIn"
        icon={<LinkedinIcon />}
      />
    </ExternalLink>
    <ExternalLink to={founderTelegramUrl}>
      <IconCentricButton
        as="div"
        text="Message on Telegram"
        icon={<TelegramIcon />}
      />
    </ExternalLink>
    <ExternalLink to={`mailto:${founderEmail}`}>
      <IconCentricButton as="div" text="Send an email" icon={<EnvelopIcon />} />
    </ExternalLink>
  </VStack>
)
