import { ExternalLink } from '@lib/ui/navigation/Link/ExternalLink'
import { Text } from '@lib/ui/text'
import { LinkText } from '@lib/ui/text/LinkText'
import { WEBSITE_URL } from '@product/app/product'
import { productName } from '@product/config'

export const SignUpAgreement = () => {
  return (
    <Text centerHorizontally size={14} color="supporting">
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
