import { ReactNode } from 'react'
import styled, { useTheme } from 'styled-components'
import { LandingSlice } from '@increaser/ui/landing/LandingSlice'
import { VStack } from '@increaser/ui/layout/Stack'
import { centerContent } from '@increaser/ui/css/centerContent'

import { TestimonialItem } from './TestimonialItem'
import { Testimonial } from './testimonials'

interface Props {
  testimonials: Testimonial[]
  headline: ReactNode
}

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 40px 0;
  gap: 80px;

  @media (max-width: 1120px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`

const HeadlineContainer = styled.div`
  ${centerContent}
  min-height: 80px;
`

export const TestimonialsSlice = ({ testimonials, headline }: Props) => {
  const theme = useTheme()
  return (
    <LandingSlice>
      <VStack fullWidth>
        <HeadlineContainer>{headline}</HeadlineContainer>
        <TestimonialsGrid>
          {testimonials.map((testimonial, index) => (
            <TestimonialItem
              key={index}
              testimonial={testimonial}
              color={theme.colors.getLabelColor(index)}
            />
          ))}
        </TestimonialsGrid>
      </VStack>
    </LandingSlice>
  )
}
