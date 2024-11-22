import { PageMetaTags } from '@lib/next-ui/metadata/PageMetaTags'
import { PricingSlice } from './PricingSlice'
import { PrimarySlice } from './PrimarySlice'
import { VideoSlice } from './video/VideoSlice'
import { FaqSlice } from './FaqSlice'
import { ClosingArgumentSlice } from './ClosingArgumentSlice'
import { FoundersNoteSlice } from './FoundersNoteSlice'
import { ScoreboardSlice } from './ScoreboardSlice'
import { TestimonialsSlice } from './testimonials/TestimonialsSlice'
import { productTools } from '@increaser/entities/ProductTool'
import { ProductToolSlice } from './demo/ProductToolSlice'
import { VStack } from '@lib/ui/css/stack'
import styled from 'styled-components'

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
    <ScoreboardSlice />
    <PricingSlice />
    <FoundersNoteSlice />
    <FaqSlice />
    <ClosingArgumentSlice />
  </>
)
