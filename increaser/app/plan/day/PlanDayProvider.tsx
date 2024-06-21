import { ComponentWithChildrenProps } from '@lib/ui/props'
import { PlanDayStep } from './PlanDayStep'
import { useMemo, useState } from 'react'
import { usePlanDayCompletion } from './hooks/usePlanDayCompletion'
import { PlanDayContext } from './state/PlanDayContext'
import { useHasOverdueTasks } from '@increaser/ui/tasks/hooks/useHasOverdueTasks'
import { getCurrentPlanDayStep } from './utils/getCurrentPlanDayStep'

export const PlanDayProvider = ({ children }: ComponentWithChildrenProps) => {
  const completion = usePlanDayCompletion()
  const [currentStep, setCurrentStep] = useState<PlanDayStep | null>(() =>
    getCurrentPlanDayStep(completion),
  )

  const hasOverdueTasks = useHasOverdueTasks()

  const currentStepError = useMemo(() => {
    if (currentStep === 'tasks' && hasOverdueTasks) {
      return 'Clear overdue tasks before you can proceed'
    }
  }, [currentStep, hasOverdueTasks])

  return (
    <PlanDayContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        currentStepError,
      }}
    >
      {children}
    </PlanDayContext.Provider>
  )
}
