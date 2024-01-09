import {
  ExternalLinkProps,
  ExternalLink,
} from '@lib/ui/navigation/Link/ExternalLink'
import { joinPaths } from '@lib/utils/query/joinPaths'
import { appUrl } from '../config'

export const AppLink = ({
  to,
  openInSameTab = true,
  isReferring = true,
  ...rest
}: ExternalLinkProps) => (
  <ExternalLink
    to={joinPaths(appUrl, to)}
    openInSameTab={openInSameTab}
    isReferring={isReferring}
    {...rest}
  />
)
