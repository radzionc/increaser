import { PageMetaTags } from '@lib/next-ui/metadata/PageMetaTags'

import { ProjectsProvider } from '@increaser/ui/projects/ProjectsProvider'
import { MockApiProvider } from '@increaser/website/api/MockApiProvider'
import { DemoUserStateProvider } from '../landing/demo/DemoUserStateProvider'
import { PrimaryWebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import {
  FeatureVideoSlice,
  FeatureVideoSliceProps,
} from '@lib/ui/website/FeatureVideoSlice'
import { WorkBudgetSlice } from '../landing/demo/WorkBudgetSlice'

const videoSlices: FeatureVideoSliceProps[] = [
  {
    videoId: 'budget',
    title: `Set a Realistic Work Budget Based on Your Previous Work Hours`,
    subtitle: `Use insights from your past work patterns to plan a balanced and achievable work schedule for optimal productivity`,
  },
  {
    videoId: 'compare',
    title: `Compare Current Week's Work Hours to Your Planned Budget`,
    subtitle: `Track your progress and adjust your schedule to stay on target and maintain productivity`,
  },
]

export const WorkBudgetPage = () => (
  <>
    <PageMetaTags
      title={`Maximize Productivity with Increaser's Work Budget Tool`}
      description={`Set and manage your ideal work hours with Increaser's Work Budget feature. Plan your workweek, allocate time for projects, and achieve a better work-life balance. Start maximizing your productivity with Increaser today!`}
    />
    <DemoUserStateProvider>
      <MockApiProvider>
        <ProjectsProvider>
          <PrimaryWebsiteSlice>
            <WorkBudgetSlice titleAs="h1" />
          </PrimaryWebsiteSlice>
        </ProjectsProvider>
      </MockApiProvider>
    </DemoUserStateProvider>
    {videoSlices.map((slice, index) => (
      <FeatureVideoSlice key={index} {...slice} />
    ))}
  </>
)
