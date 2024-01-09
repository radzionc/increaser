import { PageMetaTags } from '@lib/next-ui/metadata/PageMetaTags'
import { PricingSlice } from './PricingSlice'
import { PrimarySlice } from './PrimarySlice'
import { DemoSlice } from './DemoSlice'
import { FaqSlice } from './FaqSlice'
import { ClosingArgumentSlice } from './ClosingArgumentSlice'
import { FoundersNoteSlice } from './FoundersNoteSlice'
import { ScoreboardSlice } from './ScoreboardSlice'
import { HabitsSlice } from './HabitsSlice'
import { UserStateProvider } from './UserStateProvider'
import { FocusSlice } from './FocusSlice'
import { ProjectsProvider } from '@increaser/ui/projects/ProjectsProvider'
import { TimeTrackingSlice } from './TimeTrackingSlice'
import { ScheduleSlice } from './ScheduleSlice'
import { TestimonialsSlice } from './testimonials/TestimonialsSlice'

export const LandingPage = () => (
  <>
    <PageMetaTags
      title="Master Remote Work with Increaser – Enhance Focus and Time Management"
      description="Increaser offers a unique solution for remote workers seeking to boost efficiency, track time, and develop positive habits for better career and health outcomes."
    />
    <PrimarySlice />
    <UserStateProvider>
      <ProjectsProvider>
        <FocusSlice />
        <TimeTrackingSlice />
        <HabitsSlice />
        <ScheduleSlice />
      </ProjectsProvider>
    </UserStateProvider>
    <TestimonialsSlice />
    <DemoSlice />
    <ScoreboardSlice />
    <PricingSlice />
    <FoundersNoteSlice />
    <FaqSlice />
    <ClosingArgumentSlice />
  </>
)
