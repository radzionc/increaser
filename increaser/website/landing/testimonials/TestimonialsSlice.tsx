import { WebsiteSectionHeader } from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { productName } from '@increaser/config'
import styled from 'styled-components'
import { testimonials } from './testimonials'
import { TestimonialItem } from '@lib/ui/website/testimonials/TestimonialItem'
import { centeredContentColumn } from '@lib/ui/css/slice'

const Content = styled.div`
  column-gap: 20px;
  column-fill: initial;
  column-width: 320px;
  width: 100%;

  > * {
    margin-bottom: 20px;
  }
`

const Slice = styled(WebsiteSlice)`
  ${centeredContentColumn({
    contentMaxWidth: '100%',
  })}
`

export const TestimonialsSlice = () => {
  return (
    <Slice>
      <WebsiteSliceContent>
        <WebsiteSectionHeader
          title={`${productName} in Action`}
          subtitle={`See how our tool helps people master their time and boost productivity`}
        />
        <Content>
          {testimonials.map((testimonial, index) => (
            <TestimonialItem key={index} testimonial={testimonial} />
          ))}
        </Content>
      </WebsiteSliceContent>
    </Slice>
  )
}
