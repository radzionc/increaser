import { Path } from 'router/Path'
import { APP_NAME } from 'shared/product'
import { HStack } from '@increaser/ui/layout/Stack'
import { Text } from '@increaser/ui/text'
import { LinkText } from '@increaser/ui/text/LinkText'
import Link from 'next/link'
import { shouldBeDefined } from '@increaser/utils/shouldBeDefined'

export const Footer = () => {
  const date = new Date()
  return (
    <HStack fullWidth justifyContent="center" alignItems="center" gap={20}>
      <HStack alignItems="center" gap={20}>
        <Text color="supporting">
          © {date.getFullYear()} {APP_NAME}
        </Text>
        <Text color="supporting">
          v{shouldBeDefined(process.env.NEXT_PUBLIC_VERSION)}
        </Text>
        <Link href={Path.TermsOfService}>
          <LinkText color="supporting">Terms</LinkText>
        </Link>
        <Link href={Path.PrivacyPolicy}>
          <LinkText color="supporting">Policy</LinkText>
        </Link>
      </HStack>
    </HStack>
  )
}
