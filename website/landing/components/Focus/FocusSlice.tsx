import { LandingFeatureSlice } from '@increaser/ui/ui/landing/LandingFeatureSlice'
import { CTA } from '../CTA'
import { FocusPreview } from './FocusPreview'
import { LandingPageFocusProvider } from './LandingPageFocusProvider'

export const FocusSlice = () => {
  return (
    <LandingFeatureSlice
      startsWith="preview"
      cta={<CTA />}
      title={
        <>
          Achieve Productivity Zen and Crush Your To-Do with{' '}
          <b>deep work timer</b>
        </>
      }
      renderPreview={() => (
        <LandingPageFocusProvider>
          <FocusPreview />
        </LandingPageFocusProvider>
      )}
    />
  )
}
