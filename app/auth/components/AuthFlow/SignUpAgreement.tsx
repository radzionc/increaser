import { ExternalLink } from 'router/Link/ExternalLink'
import { Text } from '@increaser/ui/ui/Text'
import { LinkText } from '@increaser/ui/ui/Text/LinkText'
import { WEBSITE_URL } from 'product'
import { productName } from '@increaser/entities'

export const SignUpAgreement = () => {
  return (
    <Text centered size={14} color="supporting">
      By continuing, you agree to {productName}’s
      <br />
      <LinkText as="span">
        <ExternalLink to={`${WEBSITE_URL}/terms-of-service`}>
          Terms of Service
        </ExternalLink>
      </LinkText>{' '}
      and{' '}
      <LinkText as="span">
        <ExternalLink to={`${WEBSITE_URL}/privacy-policy`}>
          Privacy Policy
        </ExternalLink>
      </LinkText>
    </Text>
  )
}
