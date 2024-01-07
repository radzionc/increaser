import {
  ExternalLinkProps,
  ExternalLink,
} from '@lib/ui/navigation/Link/ExternalLink'
import { shouldBeDefined } from '@lib/utils/assert/shouldBeDefined'
import { joinPaths } from '@lib/utils/query/joinPaths'

export const WebsiteLink = ({
  to,
  openInSameTab = true,
  isReferring = true,
  ...rest
}: ExternalLinkProps) => (
  <ExternalLink
    to={joinPaths(shouldBeDefined(process.env.NEXT_PUBLIC_WEBSITE_URL), to)}
    openInSameTab={openInSameTab}
    isReferring={isReferring}
    {...rest}
  />
)
