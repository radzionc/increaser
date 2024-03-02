import { OnboardingStep, useOnboarding } from './OnboardingProvider'
import { OnboardingVideoPrompt } from './OnboardingVideoPrompt'

const onboardingYouTubeVideo: Partial<Record<OnboardingStep, string>> = {
  projects: 'https://youtu.be/PvDLR4rbWXw',
  workBudget: 'https://youtu.be/TYsp-iDsBuM',
  weeklyGoals: 'https://youtu.be/T9C2mJk-LB4',
  schedule: 'https://youtu.be/__zDYzlKPrE',
  dailyHabits: 'https://youtu.be/e2AQa9uHGz8',
  tasks: 'https://youtu.be/IYMY2W4gDkw',
  focus: 'https://youtu.be/5HINgMMTzPE',
}

export const OnboardingVideo = () => {
  const { currentStep } = useOnboarding()

  const youTubeVideoUrl = onboardingYouTubeVideo[currentStep]

  if (!youTubeVideoUrl) {
    return null
  }

  return <OnboardingVideoPrompt youTubeVideoUrl={youTubeVideoUrl} />
}
