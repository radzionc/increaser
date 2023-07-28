import { SignupsNumber } from './SignupsNumber'
import { testimonials } from './testimonials'
import { TestimonialsSlice } from './TestimonialSlice'

export const PrimaryTestimonialsSlice = () => (
  <TestimonialsSlice
    headline={<SignupsNumber />}
    testimonials={testimonials.slice(0, 9)}
  />
)
