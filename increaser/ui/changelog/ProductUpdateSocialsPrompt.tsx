import {
  productUpdateSocials,
  ProductUpdateSocials,
} from '@increaser/changelog/ProductUpdate'
import { Match } from '@lib/ui/base/Match'
import { SocialLink } from '@lib/ui/buttons/SocialLink'
import { IndieHackersIcon } from '@lib/ui/icons/IndieHackersIcon'
import { LinkedinIcon } from '@lib/ui/icons/LinkedinIcon'
import { RedditIcon } from '@lib/ui/icons/RedditIcon'
import { TelegramIcon } from '@lib/ui/icons/TelegramIcon'
import { XIcon } from '@lib/ui/icons/XIcon'
import { HStack } from '@lib/ui/layout/Stack'
import { ComponentWithValueProps } from '@lib/ui/props'
import { Text } from '@lib/ui/text'

export const ProductUpdateSocialsPrompt = ({
  value,
}: ComponentWithValueProps<ProductUpdateSocials>) => {
  return (
    <HStack alignItems="center" gap={8}>
      <Text color="shy" weight="bold">
        Discuss on
      </Text>
      <HStack alignItems="center">
        {productUpdateSocials.map((social) => {
          const url = value[social]
          if (!url) return null

          return (
            <SocialLink key={social} to={url}>
              <Match
                value={social}
                telegram={() => <TelegramIcon />}
                x={() => <XIcon />}
                linkedIn={() => <LinkedinIcon />}
                reddit={() => <RedditIcon />}
                indieHackers={() => <IndieHackersIcon />}
              />
            </SocialLink>
          )
        })}
      </HStack>
    </HStack>
  )
}
