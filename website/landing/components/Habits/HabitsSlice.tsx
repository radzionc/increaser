import { HabitsProvider } from 'habits/components/HabitsProvider'
import { LandingFeatureSlice } from '@increaser/ui/ui/landing/LandingFeatureSlice'
import { Text } from '@increaser/ui/ui/Text'

import { CTA } from '../CTA'
import { HabitsPreview } from './HabitsPreview'

export const HabitsSlice = () => {
  return (
    <LandingFeatureSlice
      startsWith="info"
      title={
        <>
          Take Control of Your Life with <b>Habit Tracker</b>
        </>
      }
      description="The Ultimate Companion for Building Habits"
      cta={<CTA />}
      renderPreview={() => (
        <HabitsProvider>
          <HabitsPreview />
        </HabitsProvider>
      )}
    />
  )
}
