import { OnboardingStep, useOnboarding } from './OnboardingProvider'
import { OnboardingVideoPrompt } from './OnboardingVideoPrompt'

const onboardingYouTubeVideo: Partial<Record<OnboardingStep, string>> = {
  projects: 'https://youtu.be/PvDLR4rbWXw',
  workBudget: 'https://youtu.be/TYsp-iDsBuM',
}

export const OnboardingVideo = () => {
  const { currentStep } = useOnboarding()

  const youTubeVideoUrl = onboardingYouTubeVideo[currentStep]

  if (!youTubeVideoUrl) {
    return null
  }

  return <OnboardingVideoPrompt youTubeVideoUrl={youTubeVideoUrl} />
}
