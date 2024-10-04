import { PageMetaTags } from '@lib/next-ui/metadata/PageMetaTags'

import { MockApiProvider } from '@increaser/website/api/MockApiProvider'
import { PrimaryWebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import {
  FeatureVideoSlice,
  FeatureVideoSliceProps,
} from '@lib/ui/website/FeatureVideoSlice'
import { ProjectsBudgetSlice } from '../landing/demo/ProjectsBudgetSlice'

const videoSlices: FeatureVideoSliceProps[] = [
  {
    videoId: 'project-budget',
    title: `Budget Project Time Based on Your Available Work Hours`,
    subtitle: `Allocate your time effectively across projects using insights from your work budget to maximize productivity and achieve your goals`,
  },
  {
    videoId: 'goal',
    title: `Set Goals to Work More or Less on Specific Projects`,
    subtitle: `Customize your project workload by setting goals to increase or decrease time spent, ensuring balanced and efficient progress`,
  },
  {
    videoId: 'compare-project',
    title: `Compare Your Current Project Budget to Tracked Time`,
    subtitle: `Analyze your progress by comparing your project budget with previously tracked hours to optimize future planning and productivity`,
  },
  {
    videoId: 'realtime',
    title: `Stay on Track with Real-Time Project Goal Comparison`,
    subtitle: `Instantly see how your hours worked this week measure up against your current project goals and budget to stay on track and productive`,
  },
]

export const TimePlannerPage = () => (
  <>
    <PageMetaTags
      title={`Efficient Project Management with Increaser's Projects Budget Feature`}
      description={`Allocate time wisely, set goals, and track progress to ensure successful project completion and optimal productivity`}
    />
    <MockApiProvider>
      <PrimaryWebsiteSlice>
        <ProjectsBudgetSlice titleAs="h1" />
      </PrimaryWebsiteSlice>
    </MockApiProvider>
    {videoSlices.map((slice, index) => (
      <FeatureVideoSlice key={index} {...slice} />
    ))}
  </>
)
