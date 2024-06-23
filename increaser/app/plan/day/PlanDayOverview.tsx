import { VStack } from '@lib/ui/layout/Stack'
import { usePlanDay } from './state/PlanDayContext'
import { usePlanDayCompletion } from './hooks/usePlanDayCompletion'
import { planDayStepName, planDaySteps } from './PlanDayStep'
import { FlowNavigationItem } from '@lib/ui/flow/FlowNavigationItem'

export const PlanDayOverview = () => {
  const { currentStep, setCurrentStep } = usePlanDay()
  const completion = usePlanDayCompletion()

  return (
    <VStack gap={4}>
      {planDaySteps.map((step) => {
        const isCompleted = completion[step]
        const isCurrent = currentStep === step

        return (
          <FlowNavigationItem
            key={step}
            isActive={isCurrent}
            isCompleted={isCompleted}
            isEnabled={true}
            onClick={() => setCurrentStep(step)}
            name={planDayStepName[step]}
          />
        )
      })}
    </VStack>
  )
}
