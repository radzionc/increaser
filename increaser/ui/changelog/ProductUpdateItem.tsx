import { ComponentWithValueProps } from '@lib/ui/props'
import {
  ProductUpdate,
  productUpdateSocials,
} from '../../changelog/ProductUpdate'
import { HStack, VStack } from '@lib/ui/css/stack'
import { format } from 'date-fns'
import { Text } from '@lib/ui/text'
import { NonEmptyOnly } from '@lib/ui/base/NonEmptyOnly'
import { withoutUndefinedFields } from '@lib/utils/record/withoutUndefinedFields'
import { toEntries } from '@lib/utils/record/toEntries'
import { SocialLink } from '@lib/ui/buttons/SocialLink'
import { Match } from '@lib/ui/base/Match'
import { TelegramIcon } from '@lib/ui/icons/TelegramIcon'
import { XIcon } from '@lib/ui/icons/XIcon'
import { LinkedinIcon } from '@lib/ui/icons/LinkedinIcon'
import { RedditIcon } from '@lib/ui/icons/RedditIcon'
import { IndieHackersIcon } from '@lib/ui/icons/IndieHackersIcon'
import { YouTubeColoredIcon } from '@lib/ui/icons/YouTubeColoredIcon'
import { recordFromKeys } from '@lib/utils/record/recordFromKeys'
import { ProductUpdateYouTubeVideo } from './ProductUpdateYouTubeVideo'
import { ProductUpdateSubItem } from './ProductUpdateSubItem'

export const ProductUpdateItem = ({
  value,
}: ComponentWithValueProps<ProductUpdate>) => {
  const socials = toEntries(
    withoutUndefinedFields(
      recordFromKeys(productUpdateSocials, (social) => value[social]),
    ),
  )

  return (
    <VStack gap={16}>
      <VStack gap={4}>
        <Text size={14} color="supporting">
          {format(value.releasedAt, 'MMMM d, yyyy')}
        </Text>
        <Text size={20} weight="500" color="contrast">
          {value.name}
        </Text>
        <Text color="supporting" height="l">
          {value.description}
        </Text>
      </VStack>
      {value.youtube && <ProductUpdateYouTubeVideo value={value.youtube} />}
      <NonEmptyOnly
        value={socials}
        render={(items) => (
          <HStack alignItems="center" gap={8}>
            <Text color="shy" weight="600">
              Discuss on
            </Text>
            <HStack alignItems="center">
              {items.map(({ key, value }) => {
                return (
                  <SocialLink key={key} to={value}>
                    <Match
                      value={key}
                      telegram={() => <TelegramIcon />}
                      x={() => <XIcon />}
                      linkedIn={() => <LinkedinIcon />}
                      reddit={() => <RedditIcon />}
                      indieHackers={() => <IndieHackersIcon />}
                      youtube={() => <YouTubeColoredIcon />}
                    />
                  </SocialLink>
                )
              })}
            </HStack>
          </HStack>
        )}
      />
      <NonEmptyOnly
        value={value.items}
        render={(items) => (
          <VStack>
            {items.map((value, index) => (
              <ProductUpdateSubItem key={index} value={value} />
            ))}
          </VStack>
        )}
      />
    </VStack>
  )
}
