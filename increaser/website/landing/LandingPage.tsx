import { PageMetaTags } from '@lib/next-ui/metadata/PageMetaTags'
import { PricingSlice } from './PricingSlice'
import { PrimarySlice } from './PrimarySlice'
import { VideoSlice } from './VideoSlice'
import { FaqSlice } from './FaqSlice'
import { ClosingArgumentSlice } from './ClosingArgumentSlice'
import { FoundersNoteSlice } from './FoundersNoteSlice'
import { ScoreboardSlice } from './ScoreboardSlice'
import { TestimonialsSlice } from './testimonials/TestimonialsSlice'
import { productTools } from '@increaser/entities/ProductTool'
import { ProductToolSlice } from './demo/ProductToolSlice'

export const LandingPage = () => (
  <>
    <PageMetaTags
      title="Master Remote Work with Increaser – Enhance Focus and Time Management"
      description="Increaser offers a unique solution for remote workers seeking to boost efficiency, track time, and develop positive habits for better career and health outcomes."
    />
    <PrimarySlice />
    {productTools.map((tool) => (
      <ProductToolSlice key={tool} value={tool} />
    ))}
    <TestimonialsSlice />
    <VideoSlice />
    <ScoreboardSlice />
    <PricingSlice />
    <FoundersNoteSlice />
    <FaqSlice />
    <ClosingArgumentSlice />
  </>
)
