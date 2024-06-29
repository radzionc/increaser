import { PageMetaTags } from '@lib/next-ui/metadata/PageMetaTags'

import { MockApiProvider } from '@increaser/website/api/MockApiProvider'
import { DemoUserStateProvider } from '../landing/demo/DemoUserStateProvider'
import { PrimaryWebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import {
  FeatureVideoSlice,
  FeatureVideoSliceProps,
} from '@lib/ui/website/FeatureVideoSlice'
import { HabitsSlice } from '../landing/demo/HabitsSlice'

const videoSlices: FeatureVideoSliceProps[] = [
  {
    videoId: 'habits',
    title: `Discover and Track the Best Daily Habits`,
    subtitle: `Increaser offers a curated list of productive habit ideas to choose from, helping you build and maintain a balanced and healthy lifestyle`,
  },
  {
    videoId: 'track-habits',
    title: `Track and Maintain Your Habits with Ease`,
    subtitle: `Monitor your progress and stay consistent with Increaser's habit tracking features, ensuring you build and sustain productive routines`,
  },
]

export const HabitsPage = () => (
  <>
    <PageMetaTags
      title={`Build and Track Productive Habits with Increaser`}
      description={`Develop and maintain healthy, productive habits with Increaser. Track your progress, set daily goals, and achieve a balanced lifestyle. Start building better habits today with Increaser!`}
    />
    <DemoUserStateProvider>
      <MockApiProvider>
        <PrimaryWebsiteSlice>
          <HabitsSlice titleAs="h1" />
        </PrimaryWebsiteSlice>
      </MockApiProvider>
    </DemoUserStateProvider>
    {videoSlices.map((slice, index) => (
      <FeatureVideoSlice key={index} {...slice} />
    ))}
  </>
)
