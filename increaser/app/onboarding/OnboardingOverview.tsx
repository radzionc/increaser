import { HStack, VStack } from '@lib/ui/layout/Stack'
import { useOnboarding } from './OnboardingProvider'
import { Text } from '@lib/ui/text'
import { without } from '@lib/utils/array/without'
import { OnboardingSection } from './OnboardingSection'
import { onboardingStepTargetName, onboardingSteps } from './OnboardingStep'
import { ExitOnboarding } from './ExitOnboarding'
import { FlowNavigationItem } from '@lib/ui/flow/FlowNavigationItem'

export const OnboardingOverview = () => {
  const { currentStep, setCurrentStep, completedSteps } = useOnboarding()

  return (
    <OnboardingSection
      title={
        <HStack alignItems="center" gap={8}>
          <Text>Quick Setup</Text>
          <Text color="success">
            {completedSteps.length} / {onboardingSteps.length}
          </Text>
        </HStack>
      }
    >
      <VStack style={{ flex: 1 }} justifyContent="space-between" gap={20}>
        <VStack gap={4}>
          {onboardingSteps.map((step) => {
            const isCompleted = completedSteps.includes(step)
            const isCurrent = currentStep === step
            const isEnabled =
              isCompleted ||
              without(onboardingSteps, ...completedSteps)[0] === step

            return (
              <FlowNavigationItem
                key={step}
                isActive={isCurrent}
                isCompleted={isCompleted}
                isEnabled={isEnabled}
                onClick={() => setCurrentStep(step)}
                name={onboardingStepTargetName[step]}
              />
            )
          })}
        </VStack>
        <ExitOnboarding />
      </VStack>
    </OnboardingSection>
  )
}
