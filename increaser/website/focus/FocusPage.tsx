import { PageMetaTags } from '@lib/next-ui/metadata/PageMetaTags'

import { PrimaryWebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { productName } from '@increaser/config'
import {
  FeatureVideoSlice,
  FeatureVideoSliceProps,
} from '@lib/ui/website/FeatureVideoSlice'
import { FocusSlice } from '../landing/demo/FocusSlice'

const videoSlices: FeatureVideoSliceProps[] = [
  {
    videoId: 'sounds',
    title: `Enhance Your Focus with Increaser's Customizable Focus Sounds`,
    subtitle: `Boost productivity and concentration with personalized ambient noise and relaxing background sounds`,
  },
  {
    videoId: 'block',
    title: 'Maximize Productivity with 90-Minute Work Blocks',
    subtitle:
      'Achieve optimal focus and efficiency by structuring your workday into manageable sessions',
  },
  {
    videoId: 'track',
    title: 'Track Every Focus Session with Precision',
    subtitle:
      'Know exactly how much time you spend on each task and project for better time management and productivity insights',
  },
]

export const FocusPage = () => (
  <>
    <PageMetaTags
      title={`Focus Timer for Enhanced Productivity | Pomodoro Technique & Ambient Sounds | ${productName}`}
      description={`Boost your productivity with Increaser's Focus Timer. Work in 90-minute blocks with customizable breaks, ambient sounds, and project tracking to maximize efficiency and maintain work-life balance. Try Increaser's focus timer today!`}
    />
    <PrimaryWebsiteSlice>
      <FocusSlice titleAs="h1" />
    </PrimaryWebsiteSlice>
    {videoSlices.map((slice, index) => (
      <FeatureVideoSlice key={index} {...slice} />
    ))}
  </>
)
