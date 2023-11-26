import { VStack } from '@increaser/ui/layout/Stack'
import { Text } from '@increaser/ui/text'
import { testimonials } from './testimonials'
import { TestimonialsSlice } from './TestimonialSlice'

export const SecondaryTestimonialSlice = () => (
  <TestimonialsSlice
    headline={
      <VStack alignItems="center">
        <Text style={{ textTransform: 'uppercase' }} size={24} weight="bold">
          "Lost time is never found again"
        </Text>
        <Text color="supporting">Benjamin Franklin</Text>
      </VStack>
    }
    testimonials={testimonials.slice(9)}
  />
)
