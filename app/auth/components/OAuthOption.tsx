import { analytics } from 'analytics'

import { ExternalLink } from 'router/Link/ExternalLink'
import { IconCentricButton } from '@increaser/ui/ui/buttons/IconCentricButton'
import { AuthProvider } from '@increaser/api-interface/client/graphql'
import { getOAuthUrl } from 'auth/utils/oauth'
import { oauthProviderNameRecord } from 'auth/oauthProviderNameRecord'
import { AuthProviderIcon } from './AuthProviderIcon'

interface OAuthOptionProps {
  provider: AuthProvider
}

export const OAuthOption = ({ provider }: OAuthOptionProps) => {
  const providerName = oauthProviderNameRecord[provider]

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
