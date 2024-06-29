import { PageMetaTags } from '@lib/next-ui/metadata/PageMetaTags'

import { MockApiProvider } from '@increaser/website/api/MockApiProvider'
import { TimeTrackingSlice } from '../landing/demo/TimeTrackingSlice'
import { DemoUserStateProvider } from '../landing/demo/DemoUserStateProvider'
import { PrimaryWebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { freeTrialDays, productName } from '@increaser/config'
import {
  FeatureVideoSlice,
  FeatureVideoSliceProps,
} from '@lib/ui/website/FeatureVideoSlice'

const videoSlices: FeatureVideoSliceProps[] = [
  {
    videoId: 'start-session',
    title: 'Track Time with Focus Sessions',
    subtitle: `Start a focus session to track time on projects or tasks and boost your productivity. Each task is linked to a project, ensuring all your work is organized and accounted for.`,
  },
  {
    videoId: 'track-time',
    title: 'Effortlessly Manage Your Sessions',
    subtitle:
      'Easily add, edit, or delete sessions with the intuitive sessions editor. Take full control of your time tracking and ensure precise records of all your work sessions.',
  },
  {
    videoId: 'track-tasks',
    title: 'Track Time Spent on Tasks',
    subtitle:
      'Monitor your productivity by tracking the time spent on each task. Increaser helps you stay on top of your workload and ensures every minute is accounted for.',
  },
]

export const TimeTrackingPage = () => (
  <>
    <PageMetaTags
      title={`Time Tracking for Productivity | ${productName} - Boost Your Efficiency`}
      description={`Enhance your productivity with ${productName}'s time tracking feature. Manage your projects, analyze your work habits, and optimize your time. Start your ${freeTrialDays}-day free trial today!`}
    />
    <DemoUserStateProvider>
      <MockApiProvider>
        <PrimaryWebsiteSlice>
          <TimeTrackingSlice titleAs="h1" />
        </PrimaryWebsiteSlice>
      </MockApiProvider>
    </DemoUserStateProvider>
    {videoSlices.map((slice, index) => (
      <FeatureVideoSlice key={index} {...slice} />
    ))}
  </>
)
