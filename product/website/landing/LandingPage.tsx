import { PageMetaTags } from '@lib/next-ui/metadata/PageMetaTags'
import { VStack } from '@lib/ui/css/stack'
import { productTools } from '@product/entities/ProductTool'
import styled from 'styled-components'

import { ClosingArgumentSlice } from './ClosingArgumentSlice'
import { ProductToolSlice } from './demo/ProductToolSlice'
import { FaqSlice } from './FaqSlice'
import { FoundersNoteSlice } from './FoundersNoteSlice'
import { PricingSlice } from './PricingSlice'
import { PrimarySlice } from './PrimarySlice'
import { TestimonialsSlice } from './testimonials/TestimonialsSlice'
import { VideoSlice } from './video/VideoSlice'

const ProductToolsContainer = styled(VStack)`
  > * {
    &:first-child {
      padding-top: 0;
    }
  }
`

export const LandingPage = () => (
  <>
    <PageMetaTags
      title="Master Remote Work with Increaser – Enhance Focus and Time Management"
      description="Increaser offers a unique solution for remote workers seeking to boost efficiency, track time, and develop positive habits for better career and health outcomes."
    />
    <PrimarySlice />
    <ProductToolsContainer>
      {productTools.map((tool) => (
        <ProductToolSlice key={tool} value={tool} />
      ))}
    </ProductToolsContainer>
    <TestimonialsSlice />
    <VideoSlice />
    <PricingSlice />
    <FoundersNoteSlice />
    <FaqSlice />
    <ClosingArgumentSlice />
  </>
)
