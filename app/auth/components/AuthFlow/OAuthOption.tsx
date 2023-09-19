import { analytics } from 'analytics'

import { ExternalLink } from 'router/Link/ExternalLink'
import { IconCentricButton } from '@increaser/ui/ui/buttons/IconCentricButton'
import { AuthProvider } from '@increaser/api-interface/client/graphql'
import { getOAuthUrl } from 'auth/helpers/OAuthProviderUrl'
import { oauthProviderNameRecord } from 'auth/oauthProviderNameRecord'
import { AuthProviderIcon } from '../AuthProviderIcon'

interface OAuthOptionProps {
  provider: AuthProvider
}

export const OAuthOption = ({ provider }: OAuthOptionProps) => (
  <ExternalLink
    key={provider}
    to={getOAuthUrl(provider)}
    style={{ width: '100%' }}
    openInSameTab
    onClick={() => {
      analytics.trackEvent(
        `Start identification with ${oauthProviderNameRecord[provider]}`,
      )
    }}
  >
    <IconCentricButton
      as="div"
      text={`Continue with ${oauthProviderNameRecord[provider]}`}
      icon={<AuthProviderIcon provider={provider} />}
    />
  </ExternalLink>
)
