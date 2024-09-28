import { PageMetaTags } from '@lib/next-ui/metadata/PageMetaTags'
import { PricingSlice } from './PricingSlice'
import { PrimarySlice } from './PrimarySlice'
import { VideoSlice } from './VideoSlice'
import { FaqSlice } from './FaqSlice'
import { ClosingArgumentSlice } from './ClosingArgumentSlice'
import { FoundersNoteSlice } from './FoundersNoteSlice'
import { ScoreboardSlice } from './ScoreboardSlice'
import { DemoUserStateProvider } from './demo/DemoUserStateProvider'
import { TestimonialsSlice } from './testimonials/TestimonialsSlice'
import { MockApiProvider } from '@increaser/website/api/MockApiProvider'
import { productTools } from '@increaser/entities/ProductTool'
import { ProductToolSlice } from './demo/ProductToolSlice'
import { FocusIntervalsProvider } from '@increaser/app/focus/state/focusIntervals'

export const LandingPage = () => (
  <>
    <PageMetaTags
      title="Master Remote Work with Increaser – Enhance Focus and Time Management"
      description="Increaser offers a unique solution for remote workers seeking to boost efficiency, track time, and develop positive habits for better career and health outcomes."
    />
    <PrimarySlice />
    <DemoUserStateProvider>
      <FocusIntervalsProvider>
        <MockApiProvider>
          {productTools.map((tool) => (
            <ProductToolSlice key={tool} value={tool} />
          ))}
        </MockApiProvider>
      </FocusIntervalsProvider>
    </DemoUserStateProvider>
    <TestimonialsSlice />
    <VideoSlice />
    <ScoreboardSlice />
    <PricingSlice />
    <FoundersNoteSlice />
    <FaqSlice />
    <ClosingArgumentSlice />
  </>
)
