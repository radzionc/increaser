import { PageMetaTags } from '@lib/next-ui/metadata/PageMetaTags'

import { MockApiProvider } from '@increaser/website/api/MockApiProvider'
import { DemoUserStateProvider } from '../landing/demo/DemoUserStateProvider'
import { PrimaryWebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import {
  FeatureVideoSlice,
  FeatureVideoSliceProps,
} from '@lib/ui/website/FeatureVideoSlice'
import { ScheduleSlice } from '../landing/demo/ScheduleSlice'

const videoSlices: FeatureVideoSliceProps[] = [
  {
    videoId: 'schedule',
    title: `Schedule Your Essential Daily Activities`,
    subtitle: `Select optimal times for your daily events like waking up, starting work, meals, and bedtime to maintain a healthy and productive routine`,
  },
  {
    videoId: 'finish-work',
    title: `Track Start and End Times to Avoid Overworking`,
    subtitle: `Use Increaser's time tracking to monitor your work hours, ensuring you start and end work at optimal times to maintain a healthy work-life balance and prevent late-night work sessions`,
  },
]

export const SchedulePage = () => (
  <>
    <PageMetaTags
      title={`Optimize Your Daily Routine with Increaser's Schedule Feature`}
      description={`Enhance your productivity with Increaser's Schedule feature. Plan and organize your daily activities, set work and break times, and ensure a balanced work-life routine. Start optimizing your schedule with Increaser today!`}
    />
    <DemoUserStateProvider>
      <MockApiProvider>
        <PrimaryWebsiteSlice>
          <ScheduleSlice titleAs="h1" />
        </PrimaryWebsiteSlice>
      </MockApiProvider>
    </DemoUserStateProvider>
    {videoSlices.map((slice, index) => (
      <FeatureVideoSlice key={index} {...slice} />
    ))}
  </>
)
