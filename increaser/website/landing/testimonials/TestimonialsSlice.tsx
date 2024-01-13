import { WebsiteSectionHeader } from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { productName } from '@increaser/config'
import styled from 'styled-components'
import { testimonials } from './testimonials'
import { TestimonialItem } from '@lib/ui/website/testimonials/TestimonialItem'
import { TestimonialsContainer } from '@lib/ui/website/testimonials/TestimonialsContainer'
import { centeredContentColumn } from '@lib/ui/css/centeredContentColumn'
import { useIsScreenWidthLessThan } from '@lib/ui/hooks/useIsScreenWidthLessThan'

const Slice = styled(WebsiteSlice)`
  ${centeredContentColumn({
    contentMaxWidth: '100%',
  })}
`

export const TestimonialsSlice = () => {
  const isSmallScreen = useIsScreenWidthLessThan(600)
  const items = isSmallScreen ? testimonials.slice(0, 6) : testimonials

  return (
    <Slice>
      <WebsiteSliceContent>
        <WebsiteSectionHeader
          title={`${productName} in Action`}
          subtitle={`See how our tool helps people master their time and boost productivity`}
        />
        <TestimonialsContainer>
          {items.map((testimonial, index) => (
            <TestimonialItem key={index} testimonial={testimonial} />
          ))}
        </TestimonialsContainer>
      </WebsiteSliceContent>
    </Slice>
  )
}
