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
        <HabitsSlice />
      </ProjectsProvider>
    </UserStateProvider>
    <DemoSlice />
    <ScoreboardSlice />
    <PricingSlice />
    <FoundersNoteSlice />
    <FaqSlice />
    <ClosingArgumentSlice />
  </>
)
