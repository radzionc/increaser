import { analytics } from '@increaser/app/analytics'

import { ExternalLink } from '@increaser/app/router/Link/ExternalLink'
import { IconCentricButton } from '@lib/ui/buttons/IconCentricButton'
import { getOAuthUrl } from '@increaser/app/auth/utils/oauth'
import { AuthProviderIcon } from './AuthProviderIcon'
import {
  OAuthProvider,
  oAuthProviderName,
} from '@increaser/entities/OAuthProvider'

interface OAuthOptionProps {
  provider: OAuthProvider
}

export const OAuthOption = ({ provider }: OAuthOptionProps) => {
  const providerName = oAuthProviderName[provider]

  return (
    <ExternalLink
      key={provider}
      to={getOAuthUrl(provider)}
      openInSameTab
      onClick={() => {
        analytics.trackEvent(`Start identification with ${providerName}`)
      }}
    >
      <IconCentricButton
        as="div"
        text={`Continue with ${providerName}`}
        icon={<AuthProviderIcon provider={provider} />}
      />
    </ExternalLink>
  )
}
