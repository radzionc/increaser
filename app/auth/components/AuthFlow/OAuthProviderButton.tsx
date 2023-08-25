import { analytics } from 'analytics'
import {
  getFacebookOAuthUrl,
  getGoogleOAuthUrl,
  getOAuthProviderRedirectUri,
} from 'auth/helpers/OAuthProviderUrl'
import {
  AUTH_PROVIDER_NAME,
  OAUTH_PROVIDER_ICON,
  OAuthProvider,
} from 'auth/OAuthProvider'
import { ExternalLink } from 'router/Link/ExternalLink'
import { IconCentricButton } from '@increaser/ui/ui/buttons/IconCentricButton'

interface Props {
  provider: OAuthProvider
}

const OAuthProviderUrlRecord = {
  [OAuthProvider.Google]: getGoogleOAuthUrl,
  [OAuthProvider.Facebook]: getFacebookOAuthUrl,
}

export const OAuthProviderButton = ({ provider }: Props) => {
  const redirectUri = getOAuthProviderRedirectUri(provider)
  const url = OAuthProviderUrlRecord[provider](redirectUri)

  return (
    <ExternalLink
      key={provider}
      to={url}
      style={{ width: '100%' }}
      openInSameTab
      onClick={() => {
        analytics.trackEvent(
          `Start identification with ${AUTH_PROVIDER_NAME[provider]}`,
        )
      }}
    >
      <IconCentricButton
        as="div"
        text={`Continue with ${AUTH_PROVIDER_NAME[provider]}`}
        icon={OAUTH_PROVIDER_ICON[provider]}
      />
    </ExternalLink>
  )
}
