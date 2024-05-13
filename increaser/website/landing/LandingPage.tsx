import { PageMetaTags } from '@lib/next-ui/metadata/PageMetaTags'
import { PricingSlice } from './PricingSlice'
import { PrimarySlice } from './PrimarySlice'
import { VideoSlice } from './VideoSlice'
import { FaqSlice } from './FaqSlice'
import { ClosingArgumentSlice } from './ClosingArgumentSlice'
import { FoundersNoteSlice } from './FoundersNoteSlice'
import { ScoreboardSlice } from './ScoreboardSlice'
import { HabitsSlice } from './demo/HabitsSlice'
import { DemoUserStateProvider } from './demo/DemoUserStateProvider'
import { FocusSlice } from './demo/FocusSlice'
import { ProjectsProvider } from '@increaser/ui/projects/ProjectsProvider'
import { TimeTrackingSlice } from './demo/TimeTrackingSlice'
import { ScheduleSlice } from './demo/ScheduleSlice'
import { TestimonialsSlice } from './testimonials/TestimonialsSlice'
import { MockApiProvider } from '@increaser/website/api/MockApiProvider'
import { WorkBudgetSlice } from './demo/WorkBudgetSlice'
import { ProjectsBudgetSlice } from './demo/ProjectsBudgetSlice'
import { TasksSlice } from './demo/TasksSlice'

export const LandingPage = () => (
  <>
    <PageMetaTags
      title="Master Remote Work with Increaser – Enhance Focus and Time Management"
      description="Increaser offers a unique solution for remote workers seeking to boost efficiency, track time, and develop positive habits for better career and health outcomes."
    />
    <PrimarySlice />
    <DemoUserStateProvider>
      <MockApiProvider>
        <ProjectsProvider>
          <FocusSlice />
          <TimeTrackingSlice />
          <WorkBudgetSlice />
          <ProjectsBudgetSlice />
          <HabitsSlice />
          <TasksSlice />
          <ScheduleSlice />
        </ProjectsProvider>
      </MockApiProvider>
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
