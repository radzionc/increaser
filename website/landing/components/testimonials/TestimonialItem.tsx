import { ImageLink } from 'components/reusable/image-link'
import styled from 'styled-components'
import { HSLA } from '@increaser/ui/colors/HSLA'
import { IntersectionAware } from '@increaser/ui/IntersectionAware'
import { Spacer } from '@increaser/ui/layout/Spacer'
import { HStack, VStack } from '@increaser/ui/layout/Stack'
import { Text } from '@increaser/ui/text'
import { getHighlightedTextCSS } from '@increaser/ui/text/HighlightedText'

import { Testimonial } from './testimonials'

interface Props {
  testimonial: Testimonial
  color: HSLA
}

const TestimonialText = styled(Text)<{ highlightColor: HSLA }>`
  em {
    font-style: inherit;
    font-weight: inherit;
    ${({ highlightColor, theme }) =>
      getHighlightedTextCSS(highlightColor, theme)};
  }
`

export const TestimonialItem = ({ testimonial, color }: Props) => {
  return (
    <VStack gap={20}>
      <TestimonialText
        highlightColor={color}
        color="supporting"
        weight="semibold"
        size={20}
        dangerouslySetInnerHTML={{ __html: testimonial.html }}
      />
      <IntersectionAware<HTMLDivElement>
        render={({ ref, wasIntersected }) => (
          <HStack ref={ref} gap={20}>
            {wasIntersected ? (
              <ImageLink
                alt={testimonial.name}
                src={testimonial.imageUrl}
                to={testimonial.profilePage.url}
                side={60}
              />
            ) : (
              <Spacer width={60} height={60} />
            )}

            <VStack>
              <Text weight="semibold" size={18} color="regular">
                {testimonial.name}
              </Text>
              <Text weight="semibold" size={18} color="supporting">
                {testimonial.position}
              </Text>
            </VStack>
          </HStack>
        )}
      />
    </VStack>
  )
}
