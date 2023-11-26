import { CurrentWeekPerformance } from 'capacity/components/CurrentWeekPerformance'
import { LandingFeatureSlice } from '@increaser/ui/landing/LandingFeatureSlice'
import { VStack } from '@increaser/ui/layout/Stack'

import { CTA } from '../CTA'

export const TimeBoxingSlice = () => {
  return (
    <LandingFeatureSlice
      startsWith="preview"
      title={
        <>
          Master Your Day with <b>Time Management</b>
        </>
      }
      description="Say Goodbye to Procrastination and Hello to Productivity"
      cta={<CTA />}
      renderPreview={() => (
        <VStack style={{ maxWidth: 460 }}>
          <CurrentWeekPerformance />
        </VStack>
      )}
    />
  )
}
