import { PageMetaTags } from '@lib/next-ui/metadata/PageMetaTags'

import { MockApiProvider } from '@increaser/website/api/MockApiProvider'
import { DemoUserStateProvider } from '../landing/demo/DemoUserStateProvider'
import { PrimaryWebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import {
  FeatureVideoSlice,
  FeatureVideoSliceProps,
} from '@lib/ui/website/FeatureVideoSlice'
import { TasksSlice } from '../landing/demo/TasksSlice'

const videoSlices: FeatureVideoSliceProps[] = [
  {
    videoId: 'tasks',
    title: `Streamline Your Workflow with Smart Task Organization`,
    subtitle: `Effortlessly manage your tasks with intuitive buckets for better prioritization and productivity`,
  },
  {
    videoId: 'track',
    title: `Track Time Spent on Tasks with Precision`,
    subtitle: `Monitor your productivity and manage your workload effectively with detailed task time tracking`,
  },
]

export const TasksPage = () => (
  <>
    <PageMetaTags
      title={`Organize and Manage Your Tasks Efficiently | Increaser Task Management`}
      description={`Stay on top of your workload with Increaser's powerful task management feature. Organize tasks by deadlines, prioritize projects, and track progress to boost your productivity and achieve your goals. Try Increaser today!`}
    />
    <DemoUserStateProvider>
      <MockApiProvider>
        <PrimaryWebsiteSlice>
          <TasksSlice titleAs="h1" />
        </PrimaryWebsiteSlice>
      </MockApiProvider>
    </DemoUserStateProvider>
    {videoSlices.map((slice, index) => (
      <FeatureVideoSlice key={index} {...slice} />
    ))}
  </>
)
